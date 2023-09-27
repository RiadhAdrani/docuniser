import { PropsWithChildren, createContext, useState } from 'react';
import { Document } from '../../types';

export interface DataContext {
  documents: Array<Document>;
  createDocument: (body: Pick<Document, 'priority' | 'title'>) => void;
  deleteDocument: (id: string) => void;
  updateDocument: (body: Partial<Pick<Document, 'priority' | 'title'>>) => void;
  getDocument: (id: string) => Document | undefined;
}

export const DataContext = createContext<DataContext>({
  documents: [],
  createDocument: () => 0,
  deleteDocument: () => 0,
  getDocument: () => undefined,
  updateDocument: () => 0,
});

export const DataProvider = (props: PropsWithChildren) => {
  const [documents, setDocuments] = useState<Array<Document>>([]);

  const createDocument: DataContext['createDocument'] = (body) => {
    if (!body.title) return;

    setDocuments((state) => {
      const newDoc: Document = { ...body, id: state.length.toString() };

      return [...state, newDoc];
    });
  };

  const deleteDocument: DataContext['deleteDocument'] = (id) => {
    setDocuments((state) => state.filter((it) => it.id !== id));
  };

  const getDocument: DataContext['getDocument'] = (id) => {
    return documents.find((it) => it.id === id);
  };

  const updateDocument: DataContext['updateDocument'] = () => {};

  return (
    <DataContext.Provider
      value={{ deleteDocument, createDocument, documents, getDocument, updateDocument }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
