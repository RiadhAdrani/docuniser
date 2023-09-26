import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Chip,
  Modal,
} from '@nextui-org/react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Document, Priority } from '../../types';
import DocumentCard from '@/components/Document/Document.Card';
import { CreateDocumentModal } from '@/components/Document/Document.Create';

type ToolbarItem = {
  label: string;
  icon?: string;
  action?: () => void;
};

const HomePage = () => {
  const [showCreateDocumentModal, setShowCreateDocumentModal] = useState(false);

  const [documents, setDocuments] = useState<Array<Document>>([
    { id: '0', title: 'Riadh Adrani', priority: Priority.low },
  ]);

  const toolbarItems = useMemo<Array<ToolbarItem>>(() => {
    return [
      {
        label: 'Create document',
        icon: 'i-mdi-plus',
        action: () => setShowCreateDocumentModal((v) => !v),
      },
    ];
  }, []);

  return (
    <>
      <Navbar className="bg-zinc-200">
        <NavbarBrand>
          <Link to={'/'}>
            <Chip>
              <i className="i-mdi-book"></i> Homganizer
            </Chip>
          </Link>
        </NavbarBrand>
        <NavbarContent>
          {toolbarItems.map((item, index) => (
            <NavbarItem key={index}>
              <Button color="primary" onClick={() => item.action?.()}>
                <span className={`${item.icon}`} />
                <span> {item.label} </span>
              </Button>
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button>About</Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <Modal isOpen={showCreateDocumentModal} onOpenChange={setShowCreateDocumentModal}>
        <CreateDocumentModal
          onCreate={(doc) =>
            setDocuments((items) => [...items, { ...doc, id: items.length.toString() }])
          }
        />
      </Modal>
      <div className="col-center m-y-5">
        <div className="p-10px flex-1 gap-5 grid grid-cols-3">
          {documents.map((doc) => (
            <DocumentCard document={doc} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
