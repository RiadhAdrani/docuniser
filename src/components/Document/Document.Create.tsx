import {
  Button,
  Input,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { useState } from 'react';
import { CreateDocumentBody, Priority } from '../../../types';
import { useTranslation } from 'react-i18next';

export type CreateDocumenteModalProps = {
  onCreate: (item: CreateDocumentBody) => void;
};

export const CreateDocumentModal = (props: CreateDocumenteModalProps) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>(Priority.low);

  const { t } = useTranslation();

  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader>{t('document:createModal.title')}</ModalHeader>
          <ModalBody>
            <Input
              placeholder={t('document:createModal.input')}
              value={title}
              onInput={(e) => setTitle(e.currentTarget.value)}
            />
            <Select
              label={t('document:createModal.priority')}
              selectedKeys={new Set([priority])}
              onSelectionChange={(keys) => {
                setPriority(Array.from(keys as Set<Priority>)[0]);
              }}
            >
              {Object.keys(Priority).map((it) => (
                <SelectItem key={it} value={Object.values(Priority)[it as unknown as number]}>
                  {t(`priority:${it}`)}
                </SelectItem>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" variant="flat" onClick={onClose}>
              {t('common:close')}
            </Button>
            <Button
              color="primary"
              onClick={() => {
                if (!title) return;

                const doc: CreateDocumentBody = { priority, title };

                props.onCreate(doc);
                onClose();
              }}
            >
              {t('common:create')}
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  );
};
