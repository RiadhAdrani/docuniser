import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react';
import { Priority } from '../../../types';
import { getPriorityData } from '@/helpers/document';
import Icon from '../Icon/Icon';
import { useTranslation } from 'react-i18next';

// just to load these icons, unocss does not scan ts file
['i-mdi-check', 'i-mdi-timelapse', 'i-mdi-warning', 'i-mdi-dangerous', 'i-mdi-check'];

const Option = (opts: { priority: Priority; onClick: (v: Priority) => void }) => {
  const priority = getPriorityData(opts.priority);

  const { t } = useTranslation('priority');

  return (
    <Button
      color={priority.color as 'primary'}
      variant="flat"
      className="w-full"
      onClick={() => opts.onClick(opts.priority)}
    >
      <Icon icon={priority.icon as `i-mdi-`} />
      {t(opts.priority)}
    </Button>
  );
};

const PriorityPopover = (props: { priority: Priority; onChanged: (value: Priority) => void }) => {
  const { color, icon } = getPriorityData(props.priority);

  const { t } = useTranslation('document');

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
            title={t('choosePriority')}
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
