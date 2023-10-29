import {
  Button,
  Card,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import Icon from '../Icon/Icon';
import {
  type CheckListItem,
  CreateCheckListBody,
  Document,
  UpdateCheckListBody,
} from '../../../types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'usehooks-ts';

export type DocumentCheckListProps = {
  document: Document;
  update: (body: UpdateCheckListBody['item']) => void;
  create: (body: CreateCheckListBody['item']) => void;
  remove: (id: string) => void;
};

const DocumentCheckList = (props: DocumentCheckListProps) => {
  const { t } = useTranslation();

  const [text, setText] = useState('');

  const create = () => {
    if (!text.trim()) return;

    setText('');

    props.create({ text });
  };

  return (
    <>
      <div className="col gap-3">
        <div className="row gap-3">
          <Input
            value={text}
            color="primary"
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                create();
              }
            }}
            placeholder={t('document:checkListNewItemPlaceholder')}
            onInput={(e) => setText(e.currentTarget.value)}
            variant="bordered"
          />
          <Button isIconOnly onClick={create}>
            <Icon icon="i-mdi-add" />
          </Button>
        </div>
        <div className="col gap-1">
          {props.document.checklist.map((it) => {
            return (
              <CheckListItem key={it.id} item={it} update={props.update} remove={props.remove} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export type CheckListItemProps = {
  item: CheckListItem;
} & Pick<DocumentCheckListProps, 'remove' | 'update'>;

const CheckListItem = (props: CheckListItemProps) => {
  const { t } = useTranslation();

  const [item, setItem] = useState(props.item);

  const debouncedText = useDebounce(item.text);

  const isDone = useMemo(() => item.doneAt !== undefined, [item]);

  const toggleDone = useCallback(() => {
    props.update({ id: item.id, doneAt: !isDone });

    setItem({ ...item, doneAt: isDone ? undefined : new Date() });
  }, [item]);

  useEffect(() => {
    if (item.text !== props.item.text) {
      props.update({ id: item.id, text: debouncedText });
    }
  }, [debouncedText]);

  return (
    <Card classNames={{ base: 'shadow-md' }}>
      <div className={`row p-2`}>
        <Checkbox
          isSelected={isDone}
          onChange={toggleDone}
          color={isDone ? 'success' : 'primary'}
        />
        <Input
          value={item.text}
          variant="underlined"
          onInput={(e) => setItem({ ...item, text: e.currentTarget.value })}
          placeholder={t('document:checkListItemPlaceholder')}
          className={isDone ? 'opacity-15' : ''}
          classNames={{
            inputWrapper: 'border-0',
            input: isDone ? 'line-through' : '',
          }}
        />
        <Dropdown>
          <DropdownTrigger>
            <Button variant="light" isIconOnly>
              <Icon icon="i-mdi-dots-vertical" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem onClick={() => props.remove(item.id)}>{t('common:delete')}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </Card>
  );
};

export default DocumentCheckList;
