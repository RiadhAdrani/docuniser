import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react';
import { Priority } from '../../../types';
import { useCallback } from 'react';
import { usePriorty } from '@/helpers/document';

const PriorityPopover = (props: { priority: Priority; onChanged: (value: Priority) => void }) => {
  const Option = useCallback((opts: { priority: Priority }) => {
    const priority = usePriorty(opts.priority);

    return (
      <Button
        color={priority.color as 'primary'}
        variant="flat"
        className="w-full"
        onClick={() => props.onChanged(opts.priority)}
      >
        <i className={priority.icon} />
        {opts.priority}
      </Button>
    );
  }, []);

  const { color, icon } = usePriorty(props.priority);

  return (
    <>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button color={color as 'primary'} variant="flat">
            <i className={icon} />
            {props.priority}
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownSection>
            {Object.values(Priority)
              .filter((it) => it !== props.priority)
              .map((it) => (
                <DropdownItem key={it}>
                  <div className="w-full">
                    <Option priority={it} />
                  </div>
                </DropdownItem>
              ))}
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default PriorityPopover;
