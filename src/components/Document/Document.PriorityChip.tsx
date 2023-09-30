import { Chip } from '@nextui-org/react';
import { Priority } from '../../../types';
import { usePriorty } from '@/helpers/document';
import Icon from '../Icon/Icon';

const DocumentPriorityChip = (props: { priority: Priority }) => {
  const { priority } = props;

  const state = usePriorty(priority);

  return (
    <Chip color={state.color as 'success'} variant="flat" className={`${state.animation} infinite`}>
      <Icon icon={state.icon} />
      <span className="m-l-1">{priority}</span>
    </Chip>
  );
};

export default DocumentPriorityChip;