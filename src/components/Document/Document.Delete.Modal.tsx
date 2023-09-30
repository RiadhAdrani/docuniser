import { Button, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';

export type DocumentDeleteModalProps = {
  onConfirm: () => void;
};

export const DeleteDocumentModal = (props: DocumentDeleteModalProps) => {
  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader>Delete Document</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this document ?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onClick={onClose}>
              Close
            </Button>
            <Button
              color="danger"
              onClick={() => {
                props.onConfirm();
                onClose();
              }}
            >
              Confirm
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  );
};

export default DeleteDocumentModal;
