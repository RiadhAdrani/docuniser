import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from '@nextui-org/react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

type ToolbarItem = {
  label: string;
  icon?: string;
  action?: () => void;
};

const HomePage = () => {
  const [showCreateDocumentModal, setShowCreateDocumentModal] = useState(false);

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
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Create Document</ModalHeader>
              <ModalBody>
                <Input placeholder="Document title" />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="flat" onClick={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={onClose}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default HomePage;
