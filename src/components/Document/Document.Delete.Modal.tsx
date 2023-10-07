import { Button, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';

export type DocumentDeleteModalProps = {
  onConfirm: () => void;
};

export const DeleteDocumentModal = (props: DocumentDeleteModalProps) => {
  const { t } = useTranslation();

  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader>{t('document:deleteModal.title')}</ModalHeader>
          <ModalBody>
            <p>{t('document:deleteModal.text')}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onClick={onClose}>
              {t('common:cancel')}
            </Button>
            <Button
              color="danger"
              onClick={() => {
                props.onConfirm();
                onClose();
              }}
            >
              {t('common:delete')}
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  );
};

export default DeleteDocumentModal;
