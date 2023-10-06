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
import { PropsWithChildren, useMemo, useState } from 'react';
import { Document } from '../../../types';
import { Link } from 'react-router-dom';
import DocumentCardEmptyDescription from './Document.Card.EmptyDescription';
import DocumentPriorityChip from './Document.PriorityChip';
import DeleteDocumentModal from './Document.Delete.Modal';
import Icon from '../Icon/Icon';
import { timeAgo } from '@/helpers/time';

export type CardType = 'normal' | 'compact' | 'list';

const DocumentCard = (
  props: PropsWithChildren<{
    document: Document;
    type?: CardType;
    onDelete: (id: string) => void;
    onDuplicate: (id: string) => void;
  }>
) => {
  const { document } = props;

  const [showDelete, setShowDelete] = useState(false);

  const classes = useMemo(() => {
    let type = props.type;

    if (!type || type === 'normal') {
      return {
        card: 'h-300px',
      };
    }

    if (type === 'compact') {
      return { card: '' };
    } else {
      // ? list
      return { card: '' };
    }
  }, [props.type]);

  const actions = useMemo(
    () =>
      [
        {
          label: 'Delete',
          icon: 'i-mdi-trash',
          action: () => setShowDelete(true),
        },
        {
          label: 'Duplicate',
          icon: 'i-mdi-content-copy',
          action: () => props.onDuplicate(props.document.id),
        },
      ] as const,
    []
  );

  return (
    <>
      <Link to={`/document?id=${props.document.id}`}>
        <Card className={`${classes.card} w-full`}>
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
          {props.type === 'normal' && (
            <>
              <Divider />
              <CardBody className="overflow-hidden text-ellipsis">
                {document.shortDescription ? (
                  <>
                    <p className="text-0.85em text-zinc-500 overflow-hidden text-ellipsis line-clamp-3">
                      {document.shortDescription}
                    </p>
                  </>
                ) : (
                  <DocumentCardEmptyDescription />
                )}
              </CardBody>
            </>
          )}

          <Divider />
          <CardFooter>
            <div className="row w-full gap-1 items-center justify-between">
              <div>
                <div className="text-zinc-400 text-0.75em row-center gap-2">
                  <Icon icon="i-mdi-clock-outline" />
                  <span>updated {timeAgo(document.updatedAt)}</span>
                </div>
              </div>
              <div
                className="row gap-1 cursor-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                {actions.map((it, idx) => (
                  <Tooltip key={idx} content={it.label}>
                    <Button
                      variant="flat"
                      isIconOnly
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();

                        it.action();
                      }}
                    >
                      <Icon icon={it.icon} className="text-zinc-800" />
                    </Button>
                  </Tooltip>
                ))}
              </div>
            </div>
          </CardFooter>
        </Card>
      </Link>
      <Modal isOpen={showDelete} onOpenChange={setShowDelete}>
        <DeleteDocumentModal onConfirm={() => props.onDelete(document.id)} />
      </Modal>
    </>
  );
};

export default DocumentCard;
