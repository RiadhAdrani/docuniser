import { HTMLAttributes } from 'react';

export interface IconProps extends HTMLAttributes<HTMLElement> {
  icon: `i-mdi-${string}`;
}

const Icon = (props: IconProps) => {
  return <i className={`${props.icon} ${props.className ?? ''}`} />;
};

export default Icon;
