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
import { useTranslation } from 'react-i18next';

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
  const { t, i18n } = useTranslation();
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

        toast.success(t('toast:document.create.success'));
      })
      .catch(() => toast.error(t('toast:document.create.error')));
  };

  const deleteDocument: DataContext['deleteDocument'] = (id) => {
    fetchEvent<string>(Events.deleteDocument, id)
      .then(() => {
        setDocuments((state) => state.filter((it) => it.id !== id));

        toast.success(t('toast:document.delete.success'));
      })
      .catch(() => toast.error(t('toast:document.delete.error')));
  };

  const getDocument: DataContext['getDocument'] = (id) => {
    return documents.find((it) => it.id === id);
  };

  const updateDocument: DataContext['updateDocument'] = async (body) => {
    return fetchEvent<UpdateDocumentBody, Document>(Events.updateDocument, body).then((res) => {
      setDocuments((state) => state.map((it) => (it.id === body.id ? res.data : it)));

      toast.success(t('toast:document.update.success'));

      return res.data;
    });
  };

  const duplicateDocument: DataContext['duplicateDocument'] = async (id) => {
    try {
      await fetchEvent<string>(Events.duplicateDocument, id);

      toast.success(t('toast:document.duplicate.success'));

      const { data } = await fetchEvent<undefined, Array<Document>>(Events.getDocuments, undefined);

      setDocuments(data);
    } catch (error) {
      toast.error(t('toast:document.duplicate.error'));
    }
  };

  const setPreference: DataContext['setPreference'] = async (body) => {
    try {
      const res = await fetchEvent<UpdatePreferenceBody, Preference>(Events.updatePreference, body);

      toast.success(t('toast:preference.update.success'));

      _setPreference(res.data);
    } catch (error) {
      toast.error(t('toast:preference.update.error'));
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

      _setPreference(data);
    });
  }, []);

  // detect language changes
  useEffect(() => {
    i18n.changeLanguage(preference.lang);
  }, [preference.lang]);

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
