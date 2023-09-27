import { Chip } from '@nextui-org/react';
import { useMemo } from 'react';
import { Priority } from '../../../types';
import { usePriorty } from '@/helpers/document';

const DocumentPriorityChip = (props: { priority: Priority }) => {
  const { priority } = props;

  const state = usePriorty(priority);

  return (
    <Chip color={state.color as 'success'} variant="flat" className={`${state.animation} infinite`}>
      <i className={state.icon} />
      <span className="m-l-1">{priority}</span>
    </Chip>
  );
};

export default DocumentPriorityChip;
