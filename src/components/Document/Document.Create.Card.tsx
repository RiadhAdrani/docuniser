import { Button } from '@nextui-org/react';
import { PropsWithChildren } from 'react';

const DocumentCreateCard = (props: PropsWithChildren<{ onClick: () => void }>) => {
  return (
    <Button className="h-300px col" variant="flat" onClick={props.onClick}>
      <span className="i-mdi-plus text-2em" />
      <p>Create new document</p>
    </Button>
  );
};

export default DocumentCreateCard;
