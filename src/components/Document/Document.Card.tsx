import { Button, Card, CardBody, CardFooter, CardHeader, Divider } from '@nextui-org/react';
import { PropsWithChildren } from 'react';
import { Document } from '../../../types';
import { Link } from 'react-router-dom';
import DocumentCardEmptyDescription from './Document.Card.EmptyDescription';
import DocumentPriorityChip from './Document.PriorityChip';

const DocumentCard = (props: PropsWithChildren<{ document: Document }>) => {
  const { document } = props;

  return (
    <Link to={`/document?id=${props.document.id}`}>
      <Card className="h-300px w-full">
        <CardHeader>
          <div className="row items-center justify-between w-full overflow-hidden">
            <h3 className="whitespace-nowrap text-ellipsis overflow-hidden font-bold">
              {document.title}
            </h3>
            <DocumentPriorityChip priority={document.priority} />
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="overflow-hidden text-ellipsis">
          {document.shortDescription ? '' : <DocumentCardEmptyDescription />}
        </CardBody>
        <Divider />
        <CardFooter>
          <div className="row w-full gap-1 justify-end">
            <div
              className="row gap-1"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Button variant="flat" isIconOnly>
                <i className="i-mdi-trash" />
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default DocumentCard;
