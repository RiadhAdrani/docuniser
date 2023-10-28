import { PropsWithChildren } from 'react';

const SectionTitle = (props: PropsWithChildren) => {
  return <h3 className="text-lg font-bold">{props.children}</h3>;
};

export default SectionTitle;
