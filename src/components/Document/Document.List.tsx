import { useContext, useMemo, useState } from 'react';
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
import DocumentCard, { CardType } from './Document.Card';
import { DataContext } from '@/context/Data.context';
import { useTranslation } from 'react-i18next';

export interface DocumentListProps {
  initial: Array<Document>;
  onCreated: (body: CreateDocumentBody) => void;
  onDeleted: (id: string) => void;
  onDuplicated: (id: string) => void;
}

const DocumentList = (props: DocumentListProps) => {
  const { t } = useTranslation();

  const { preference, setPreference } = useContext(DataContext);

  const [showCreateDocumentModal, setShowCreateDocumentModal] = useState(false);

  const { docs, setAsc, setSort, asc, sort, query, setQuery } = useDocumentList(props.initial);

  const sortOptions = useMemo(
    () => [
      {
        label: 'sort:none',
        value: undefined,
      },
      {
        label: 'sort:title',
        value: 'Title',
      },
      {
        label: 'sort:creation',
        value: 'Created At',
      },
      {
        label: 'sort:update',
        value: 'Updated At',
      },
      {
        label: 'sort:priority',
        value: 'Priority',
      },
    ],
    []
  );

  const gridOptions = useMemo<Array<{ label: string; value: CardType }>>(
    () => [
      { label: 'cardType:grid', value: 'normal' },
      { label: 'cardType:compact', value: 'compact' },
      { label: 'cardType:list', value: 'list' },
    ],
    []
  );

  return (
    <>
      <div className="col gap-4">
        <div>
          <Navbar
            className="z-0"
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
                placeholder={t('document:search')}
              />
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly variant="flat">
                    <Icon icon="i-mdi-grid" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownSection title={t('document:selectCardType')}>
                    {gridOptions.map((opt, idx) => (
                      <DropdownItem
                        key={idx}
                        onClick={() => setPreference({ cardType: opt.value })}
                      >
                        <div className={`row-center justify-between`}>
                          <span>{t(opt.label)}</span>
                          {opt.value === preference.cardType && <Icon icon="i-mdi-check" />}
                        </div>
                      </DropdownItem>
                    ))}
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
            </NavbarContent>
            <NavbarContent justify="end">
              <NavbarItem>
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="flat">
                      <Icon icon="i-mdi-sort-variant" />{' '}
                      <span>
                        {t(sortOptions.find((it) => it.value === sort)?.label ?? 'sort:none')}
                      </span>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownSection title={t('common:sortBy')}>
                      {sortOptions.map((it) => (
                        <DropdownItem
                          key={t(it.value ?? 'none')}
                          onClick={() => setSort(it.value as undefined)}
                        >
                          {t(it.label)}
                        </DropdownItem>
                      ))}
                    </DropdownSection>
                  </DropdownMenu>
                </Dropdown>
              </NavbarItem>
              <NavbarItem>
                <Tooltip content={t('common:sortDirection')} placement="bottom">
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
        <div
          className={`p-5px flex-1 ${
            preference.cardType === 'list'
              ? 'col gap-5'
              : 'gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          } `}
        >
          <DocumentCreateCard onClick={() => setShowCreateDocumentModal(true)} />
          {docs.map((doc) => (
            <DocumentCard
              key={doc.id}
              type={preference.cardType}
              document={doc}
              onDelete={props.onDeleted}
              onDuplicate={props.onDuplicated}
            />
          ))}
        </div>
      </div>
      <Modal isOpen={showCreateDocumentModal} onOpenChange={setShowCreateDocumentModal}>
        <CreateDocumentModal onCreate={(body) => props.onCreated(body)} />
      </Modal>
    </>
  );
};

export default DocumentList;
