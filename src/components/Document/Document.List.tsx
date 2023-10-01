import { useMemo, useState } from 'react';
import { CreateDocumentBody, Document } from '../../../types';
import useDocumentList from '@/hooks/useDocumentList';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Input,
  Modal,
  Navbar,
  NavbarContent,
  NavbarItem,
  Switch,
  Tooltip,
} from '@nextui-org/react';
import { CreateDocumentModal } from './Document.Create';
import Icon from '../Icon/Icon';
import DocumentCreateCard from './Document.Create.Card';
import DocumentCard from './Document.Card';

export interface DocumentListProps {
  initial: Array<Document>;
  onCreated: (body: CreateDocumentBody) => void;
  onDeleted: (id: string) => void;
}

const DocumentList = (props: DocumentListProps) => {
  const [showCreateDocumentModal, setShowCreateDocumentModal] = useState(false);

  const { docs, setAsc, setSort, asc, sort, query, setQuery } = useDocumentList(props.initial);

  const sortOptions = useMemo(
    () => [
      {
        label: 'None',
        value: undefined,
      },
      {
        label: 'Title',
        value: 'Title',
      },
      {
        label: 'Creation',
        value: 'Created At',
      },
      {
        label: 'Update',
        value: 'Updated At',
      },
      {
        label: 'Priority',
        value: 'Priority',
      },
    ],
    []
  );

  return (
    <>
      <Modal isOpen={showCreateDocumentModal} onOpenChange={setShowCreateDocumentModal}>
        <CreateDocumentModal onCreate={(body) => props.onCreated(body)} />
      </Modal>
      <div className="col gap-4">
        <div>
          <Navbar
            className=""
            isBordered
            classNames={{
              base: 'items-stretch justify-stretch',
              wrapper: 'max-w-full',
            }}
          >
            <NavbarContent justify="start">
              <Input
                value={query}
                onInput={(e) => setQuery(e.currentTarget.value)}
                startContent={<Icon icon="i-mdi-search" />}
                type="search"
                placeholder="Seach Documents"
              />
            </NavbarContent>
            <NavbarContent justify="end">
              <NavbarItem>
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="flat">
                      <Icon icon="i-mdi-sort-variant" /> <span>{sort ?? 'None'}</span>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownSection title={'Sort by'}>
                      {sortOptions.map((it) => (
                        <DropdownItem
                          key={it.value ?? 'none'}
                          onClick={() => setSort(it.value as undefined)}
                        >
                          {it.label}
                        </DropdownItem>
                      ))}
                    </DropdownSection>
                  </DropdownMenu>
                </Dropdown>
              </NavbarItem>
              <NavbarItem>
                <Tooltip content={`Sort direction`} placement="bottom">
                  <div className="col-center">
                    <Switch
                      size="lg"
                      startContent={<Icon icon="i-mdi-sort-ascending" />}
                      endContent={<Icon icon="i-mdi-sort-descending" />}
                      isSelected={asc}
                      onValueChange={() => setAsc(!asc)}
                    />
                  </div>
                </Tooltip>
              </NavbarItem>
            </NavbarContent>
          </Navbar>
        </div>
        <div className="p-5px flex-1 gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <DocumentCreateCard onClick={() => setShowCreateDocumentModal(true)} />
          {docs.map((doc) => (
            <DocumentCard key={doc.id} document={doc} onDelete={props.onDeleted} />
          ))}
        </div>
      </div>
    </>
  );
};

export default DocumentList;
