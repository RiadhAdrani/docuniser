import { Chip } from '@nextui-org/react';
import { Priority } from '../../../types';
import { usePriorty } from '@/helpers/document';
import Icon from '../Icon/Icon';
import { useTranslation } from 'react-i18next';

const DocumentPriorityChip = (props: { priority: Priority }) => {
  const { priority } = props;
  const { t } = useTranslation('priority');

  const state = usePriorty(priority);

  return (
    <Chip color={state.color as 'success'} variant="flat" className={`${state.animation} infinite`}>
      <Icon icon={state.icon as `i-mdi-`} />
      <span className="m-l-1">{t(priority)}</span>
    </Chip>
  );
};

export default DocumentPriorityChip;
