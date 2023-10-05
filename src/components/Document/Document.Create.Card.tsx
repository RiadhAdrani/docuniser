import { UIContext } from '@/context/UI.context';
import { Button } from '@nextui-org/react';
import { PropsWithChildren, useContext } from 'react';

const DocumentCreateCard = (props: PropsWithChildren<{ onClick: () => void }>) => {
  const { cardType } = useContext(UIContext);

  return (
    <Button
      className={` ${cardType === 'normal' ? 'col h-300px ' : `row h-full p-y-10`}`}
      variant="flat"
      onClick={props.onClick}
    >
      <span className="i-mdi-plus text-2em" />
      <p>Create new document</p>
    </Button>
  );
};

export default DocumentCreateCard;
