import { useEffect, useState } from 'react';
import { Events, FileData } from '../../../types';
import {
  Button,
  Card,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
} from '@nextui-org/react';
import { fetchEvent } from '@/helpers/utils';
import Icon from '../Icon/Icon';
import { toast } from 'sonner';

export type DocumentFilesProps = {
  items: Array<string>;
  remove: (path: string) => void;
};

const DocumentFiles = (props: DocumentFilesProps) => {
  const [data, setData] = useState<Array<FileData>>([]);

  useEffect(() => {
    fetchEvent<Array<string>, Array<FileData>>(Events.fetchFilesData, props.items).then((res) => {
      setData(res.data);
    });
  }, [props.items]);

  const open = (item: FileData) => {
    toast.message('Open file : Not implemented yet');
    // fetchEvent<string>(Events.openFile, item.path);
  };

  return (
    <>
      {data.map((it) => (
        <Card key={it.path} classNames={{ base: 'shadow-md' }} className="row-center gap-3 p-l-3">
          <Tooltip content={it.path}>
            <span>{it.name}</span>
          </Tooltip>
          <Chip size="sm" color="secondary">
            {it.type}
          </Chip>
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant="light">
                <Icon icon="i-mdi-dots-vertical" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem onClick={() => open(it)}>Open</DropdownItem>
              <DropdownItem onClick={() => props.remove(it.path)}>Remove</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Card>
      ))}
    </>
  );
};

export default DocumentFiles;
