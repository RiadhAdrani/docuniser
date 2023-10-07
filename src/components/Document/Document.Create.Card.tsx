import { DataContext } from '@/context/Data.context';
import { Button } from '@nextui-org/react';
import { PropsWithChildren, useContext } from 'react';
import { useTranslation } from 'react-i18next';

const DocumentCreateCard = (props: PropsWithChildren<{ onClick: () => void }>) => {
  const { preference } = useContext(DataContext);

  const { t } = useTranslation('document');

  return (
    <Button
      className={` ${preference.cardType === 'normal' ? 'col h-300px ' : `row h-full p-y-10`}`}
      variant="flat"
      onClick={props.onClick}
    >
      <span className="i-mdi-plus text-2em" />
      <p>{t('create')}</p>
    </Button>
  );
};

export default DocumentCreateCard;
