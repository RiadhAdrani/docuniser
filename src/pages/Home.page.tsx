import { Modal } from '@nextui-org/react';
import { useContext, useState } from 'react';
import DocumentCard from '@/components/Document/Document.Card';
import { CreateDocumentModal } from '@/components/Document/Document.Create';
import DocumentCreateCard from '@/components/Document/Document.Create.Card';
import { DataContext } from '@/context/Data.context';

const HomePage = () => {
  const { documents, createDocument } = useContext(DataContext);

  const [showCreateDocumentModal, setShowCreateDocumentModal] = useState(false);

  return (
    <>
      <Modal isOpen={showCreateDocumentModal} onOpenChange={setShowCreateDocumentModal}>
        <CreateDocumentModal onCreate={(body) => createDocument(body)} />
      </Modal>
      <div className="col">
        <div className="p-5px flex-1 gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <DocumentCreateCard onClick={() => setShowCreateDocumentModal(true)} />
          {documents.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
