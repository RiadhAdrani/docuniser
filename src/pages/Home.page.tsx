import { useContext } from 'react';
import { DataContext } from '@/context/Data.context';
import DocumentList from '@/components/Document/Document.List';

const HomePage = () => {
  const { documents, createDocument, deleteDocument, duplicateDocument } = useContext(DataContext);

  return (
    <>
      <DocumentList
        initial={documents}
        onCreated={createDocument}
        onDeleted={deleteDocument}
        onDuplicated={duplicateDocument}
      />
    </>
  );
};

export default HomePage;
