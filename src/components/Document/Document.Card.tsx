import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider } from '@nextui-org/react';
import { PropsWithChildren, useMemo } from 'react';
import { Document, Priority } from '../../../types';

const DocumentCard = (props: PropsWithChildren<{ document: Document }>) => {
  const { document } = props;

  const state = useMemo(() => {
    const { priority } = document;
    switch (priority) {
      case Priority.low:
        return { color: 'success', icon: 'i-mdi-check' };
      case Priority.medium:
        return { color: 'secondary', icon: 'i-mdi-timelapse' };
      case Priority.high:
        return { color: 'warning', icon: 'i-mdi-warning', animation: 'animate-pulse' };
      case Priority.urgent:
        return { color: 'danger', icon: 'i-mdi-dangerous', animation: 'animate-pulse' };
      default:
        return { color: 'success', icon: 'i-mdi-check' };
    }
  }, [document]);

  return (
    <Card className="h-300px w-400px">
      <CardHeader>
        <div className="row items-center justify-between w-full">
          <h3>{document.title}</h3>
          <Chip
            color={state.color as 'success'}
            variant="flat"
            className={`${state.animation} infinite`}
          >
            <i className={state.icon} />
            <span className="m-l-1">{document.priority}</span>
          </Chip>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="overflow-hidden text-ellipsis">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi nam quod facere hic dicta
        distinctio repellendus similique inventore sit nihil? Delectus laborum dolore earum porro
        fugiat architecto deserunt in repudiandae.
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="row w-full gap-1">
          <Button variant="flat" isIconOnly>
            <i className="i-mdi-edit" />
          </Button>
          <div className="row gap-1">
            <Button variant="flat" isIconOnly>
              <i className="i-mdi-trash" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DocumentCard;
