import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Tooltip,
} from '@nextui-org/react';
import { Priority } from '../../../types';
import { getPriorityData } from '@/helpers/document';
import Icon from '../Icon/Icon';

const Option = (opts: { priority: Priority; onClick: (v: Priority) => void }) => {
  const priority = getPriorityData(opts.priority);

  return (
    <Button
      color={priority.color as 'primary'}
      variant="flat"
      className="w-full"
      onClick={() => opts.onClick(opts.priority)}
    >
      <Icon icon={priority.icon as `i-mdi-`} />
      {opts.priority}
    </Button>
  );
};

const PriorityPopover = (props: { priority: Priority; onChanged: (value: Priority) => void }) => {
  const { color, icon } = getPriorityData(props.priority);

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
          <DropdownSection
            title={'Choose Priority'}
            classNames={{ divider: 'hidden', base: 'col' }}
          >
            {Object.values(Priority)
              .filter((it) => it !== props.priority)
              .map((it) => (
                <DropdownItem key={it} className="m-t-1 p-y-0">
                  <div className="w-full">
                    <Option priority={it} onClick={props.onChanged} />
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
