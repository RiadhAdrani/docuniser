import { useEffect, useState } from 'react';
import { Events, FileData } from '../../../types';
import {
  Button,
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { fetchEvent } from '@/helpers/utils';
import Icon from '../Icon/Icon';

export type DocumentFilesProps = {
  items: Array<string>;
};

const DocumentFiles = (props: DocumentFilesProps) => {
  const [data, setData] = useState<Array<FileData>>([]);

  useEffect(() => {
    fetchEvent<Array<string>, Array<FileData>>(Events.fetchFilesData, props.items).then((res) => {
      setData(res.data);
    });
  }, [props.items]);

  const open = (item: FileData) => {
    fetchEvent<string>(Events.openFile, item.path);
  };

  const remove = (item: FileData) => {};

  return (
    <>
      {data.map((it) => (
        <Card key={it.path} className="row-center gap-3 p-l-3">
          <span>{it.name}</span>
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant="light">
                <Icon icon="i-mdi-dots-vertical" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem onClick={() => open(it)}>Open</DropdownItem>
              <DropdownItem onClick={() => remove(it)}>Remove</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Card>
      ))}
    </>
  );
};

export default DocumentFiles;
