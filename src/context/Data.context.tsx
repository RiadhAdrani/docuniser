import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { fetchEvent } from '@/helpers/utils';
import {
  Events,
  CreateDocumentBody,
  Document,
  UpdateDocumentBody,
  Preference,
  UpdatePreferenceBody,
} from '../../types/index';
import { toast } from 'sonner';

export interface DataContext {
  documents: Array<Document>;
  createDocument: (body: CreateDocumentBody) => void;
  deleteDocument: (id: string) => void;
  updateDocument: (body: UpdateDocumentBody) => Promise<Document>;
  getDocument: (id: string) => Document | undefined;
  duplicateDocument: (id: string) => Promise<void>;
  preference: Preference;
  setPreference: (body: UpdatePreferenceBody) => Promise<void>;
}

export const DataContext = createContext<DataContext>({
  documents: [],
  createDocument: () => 0,
  deleteDocument: () => 0,
  getDocument: () => undefined,
  updateDocument: async () => ({} as unknown as Document),
  duplicateDocument: async () => undefined,
  preference: { cardType: 'normal', lang: 'en', theme: 'light' },
  setPreference: async () => undefined,
});

export const DataProvider = (props: PropsWithChildren) => {
  const [documents, setDocuments] = useState<Array<Document>>([]);

  const [preference, _setPreference] = useState<Preference>({
    cardType: 'normal',
    lang: 'en',
    theme: 'light',
  });

  const createDocument: DataContext['createDocument'] = (body) => {
    if (!body.title) return;

    fetchEvent<CreateDocumentBody, Document>(Events.createDocument, body)
      .then((it) => {
        setDocuments((state) => [...state, it.data]);

        toast.success('Document created successfully');
      })
      .catch(() => toast.error('Unable to create document'));
  };

  const deleteDocument: DataContext['deleteDocument'] = (id) => {
    fetchEvent<string>(Events.deleteDocument, id)
      .then(() => {
        setDocuments((state) => state.filter((it) => it.id !== id));

        toast.success('Document deleted successfully');
      })
      .catch(() => toast.error('Something went wrong while trying to delete document'));
  };

  const getDocument: DataContext['getDocument'] = (id) => {
    return documents.find((it) => it.id === id);
  };

  const updateDocument: DataContext['updateDocument'] = async (body) => {
    return fetchEvent<UpdateDocumentBody, Document>(Events.updateDocument, body).then((res) => {
      setDocuments((state) => state.map((it) => (it.id === body.id ? res.data : it)));

      toast.success('Document updated successfully');

      return res.data;
    });
  };

  const duplicateDocument: DataContext['duplicateDocument'] = async (id) => {
    try {
      await fetchEvent<string>(Events.duplicateDocument, id);

      toast.success('Document duplicated successfully.');

      const { data } = await fetchEvent<undefined, Array<Document>>(Events.getDocuments, undefined);

      setDocuments(data);
    } catch (error) {
      toast.error('Unable to duplicate document.');
    }
  };

  const setPreference: DataContext['setPreference'] = async (body) => {
    try {
      const res = await fetchEvent<UpdatePreferenceBody, Preference>(Events.updatePreference, body);

      _setPreference(res.data);
    } catch (error) {
      toast.error('Unable to update preference');
    }
  };

  // fetch for the first time
  useEffect(() => {
    // register all related events
    fetchEvent<undefined, Array<Document>>(Events.getDocuments, undefined).then((it) => {
      const { data } = it;

      setDocuments(data);
    });

    fetchEvent<undefined, Preference>(Events.getPreference, undefined).then((it) => {
      const { data } = it;

      setPreference(data);
    });
  }, []);

  return (
    <DataContext.Provider
      value={{
        deleteDocument,
        createDocument,
        documents,
        getDocument,
        updateDocument,
        duplicateDocument,
        preference,
        setPreference,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
