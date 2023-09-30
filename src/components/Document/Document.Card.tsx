import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Modal,
  Tooltip,
} from '@nextui-org/react';
import { PropsWithChildren, useContext, useState } from 'react';
import { Document } from '../../../types';
import { Link } from 'react-router-dom';
import DocumentCardEmptyDescription from './Document.Card.EmptyDescription';
import DocumentPriorityChip from './Document.PriorityChip';
import DeleteDocumentModal from './Document.Delete.Modal';
import { DataContext } from '@/context/Data.context';
import Icon from '../Icon/Icon';
import { timeAgo } from '@/helpers/time';

const DocumentCard = (props: PropsWithChildren<{ document: Document }>) => {
  const { deleteDocument } = useContext(DataContext);

  const { document } = props;

  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      <Link to={`/document?id=${props.document.id}`}>
        <Card className="h-300px w-full">
          <CardHeader>
            <div className="row items-center justify-between w-full overflow-hidden gap-4">
              <div className="col flex-1 overflow-hidden">
                <h3 className="font-bold whitespace-nowrap text-ellipsis overflow-hidden text-zinc-600">
                  {document.title}
                </h3>
                <p className="text-zinc-400 text-0.7em whitespace-nowrap text-ellipsis overflow-hidden">
                  {document.id}
                </p>
              </div>
              <DocumentPriorityChip priority={document.priority} />
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="overflow-hidden text-ellipsis">
            {document.shortDescription ? '' : <DocumentCardEmptyDescription />}
          </CardBody>
          <Divider />
          <CardFooter
            className="cursor-auto"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <div className="row w-full gap-1 items-center justify-between">
              <div>
                <div className="text-zinc-400 text-0.75em row-center gap-2">
                  <Icon icon="i-mdi-clock-outline" />
                  <span>updated {timeAgo(document.updatedAt)}</span>
                </div>
              </div>
              <div className="row gap-1">
                <Tooltip content="Delete">
                  <Button
                    variant="flat"
                    isIconOnly
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();

                      setShowDelete(true);
                    }}
                  >
                    <Icon icon="i-mdi-trash-outline" className="text-zinc-800" />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </CardFooter>
        </Card>
      </Link>
      <Modal isOpen={showDelete} onOpenChange={setShowDelete}>
        <DeleteDocumentModal onConfirm={() => deleteDocument(document.id)} />
      </Modal>
    </>
  );
};

export default DocumentCard;
