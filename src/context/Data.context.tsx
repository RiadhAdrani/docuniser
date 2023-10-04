import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { fetchEvent, onEvent, sendEvent } from '@/helpers/utils';
import { Events, CreateDocumentBody, Document, UpdateDocumentBody } from '../../types/index';
import { toast } from 'sonner';

export interface DataContext {
  documents: Array<Document>;
  createDocument: (body: CreateDocumentBody) => void;
  deleteDocument: (id: string) => void;
  updateDocument: (body: UpdateDocumentBody) => Promise<Document>;
  getDocument: (id: string) => Document | undefined;
}

export const DataContext = createContext<DataContext>({
  documents: [],
  createDocument: () => 0,
  deleteDocument: () => 0,
  getDocument: () => undefined,
  updateDocument: async () => ({} as unknown as Document),
});

export const DataProvider = (props: PropsWithChildren) => {
  const [documents, setDocuments] = useState<Array<Document>>([]);

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

  // fetch for the first time
  useEffect(() => {
    // register all related events
    fetchEvent<undefined, Array<Document>>(Events.getDocuments, undefined).then((it) => {
      const { data } = it;

      setDocuments(data);
    });
  }, []);

  return (
    <DataContext.Provider
      value={{ deleteDocument, createDocument, documents, getDocument, updateDocument }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
