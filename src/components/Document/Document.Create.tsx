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
import { Document, Priority } from '../../../types';

export type CreateDocumenteModalProps = {
  onCreate: (item: Omit<Document, 'id'>) => void;
};

export const CreateDocumentModal = (props: CreateDocumenteModalProps) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>(Priority.low);

  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader>Create Document</ModalHeader>
          <ModalBody>
            <Input
              placeholder="Document title"
              value={title}
              onInput={(e) => setTitle(e.currentTarget.value)}
            />
            <Select
              label="Select priority"
              selectedKeys={new Set([priority])}
              onSelectionChange={(keys) => {
                setPriority(Array.from(keys as Set<Priority>)[0]);
              }}
            >
              {Object.values(Priority).map((it) => (
                <SelectItem key={it} value={it}>
                  {it}
                </SelectItem>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" variant="flat" onClick={onClose}>
              Close
            </Button>
            <Button
              color="primary"
              onClick={() => {
                if (!title) return;

                const doc: Omit<Document, 'id'> = { priority, title };

                props.onCreate(doc);
                onClose();
              }}
            >
              Create
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  );
};
