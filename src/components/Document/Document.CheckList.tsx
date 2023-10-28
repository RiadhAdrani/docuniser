import { Button, Checkbox, Input } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import Icon from '../Icon/Icon';

const DocumentCheckList = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="col">
        <div className="row gap-1">
          <Checkbox />
          <Input value={'a checklist item'} variant="bordered" />
          <Button variant="light" isIconOnly>
            <Icon icon="i-mdi-dots-vertical" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default DocumentCheckList;
