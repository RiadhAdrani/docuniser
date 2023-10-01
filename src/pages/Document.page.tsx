import PriorityPopover from '@/components/Document/Document.PriorityPopover';
import { DataContext } from '@/context/Data.context';
import { Button, Divider, Input, Textarea, Tooltip } from '@nextui-org/react';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchEvent } from '@/helpers/utils';
import { Events, Document, UpdateDocumentBody, CreateDocumentBody } from '../../types';
import { useDebounce } from 'usehooks-ts';
import Icon from '@/components/Icon/Icon';
import DocumentList from '@/components/Document/Document.List';

const DocumentPage = () => {
  const { updateDocument } = useContext(DataContext);
  const [search] = useSearchParams();
  const id = useMemo(() => search.get('id'), [search.get('id')]);

  const [state, setState] = useState<'done' | 'loading' | 'error'>('loading');
  const [document, setDocument] = useState<Document | undefined>(undefined);
  const [queue, setQueue] = useState<Omit<UpdateDocumentBody, 'id'>>({});
  const [children, setChildren] = useState<Array<Document>>([]);

  const debouncedQueue = useDebounce(queue, 1000);

  const update: <T>(value: T, key: keyof Document) => void = (value, key) => {
    if (!document) return;

    setDocument({ ...document, [key]: value });
    setQueue({ [key]: value });
  };

  const createChild = useCallback(
    (body: CreateDocumentBody) => {
      if (!id) return;

      fetchEvent<CreateDocumentBody, Document>(Events.createDocument, { ...body, parent: id })
        .then((it) => {
          setChildren((state) => [...state, it.data]);
        })
        .catch(() => {});
    },
    [id]
  );

  const deleteChild = useCallback(
    (id: string) => {
      fetchEvent<string, void>(Events.createDocument, id)
        .then(() => {
          setChildren((state) => state.filter((it) => it.id !== id));
        })
        .catch(() => {});
    },
    [id]
  );

  useEffect(() => {
    if (!id) return;

    setState('loading');

    fetchEvent<string, Document>(Events.getDocument, id)
      .then((res) => {
        const { data } = res;

        setDocument(data);
        setState('done');
      })
      .catch(() => setState('error'));
  }, [id]);

  useEffect(() => {
    if (!id) return;

    fetchEvent<string, Array<Document>>(Events.getDocumentChildren, id).then((res) => {
      const { data } = res;

      setChildren(data);
    });
  }, [id]);

  useEffect(() => {
    if (!document) return;

    if (Object.keys(debouncedQueue).length === 0) return;

    const body: UpdateDocumentBody = { id: document.id, ...debouncedQueue };

    setQueue({});

    updateDocument(body)
      .then((doc) => {
        setDocument(doc);
      })
      .catch(() => {
        // TODO: display notification
      });
  }, [debouncedQueue, id]);

  useEffect(() => {
    setQueue({});
  }, [id]);

  return (
    <div className="col p-2 p-y-5 flex-1 overflow-y-hidden">
      {state === 'error' ? (
        <div className="col-center m-y-auto text-zinc-400 w-full h-full text-1.75em">
          <span className="i-mdi-text-box-remove-outline text-1.5em" />
          <p>Oops</p>
          <p className="text-0.7em">
            We were unable to load this document, or it may have been deleted.
          </p>
        </div>
      ) : (
        document && (
          <>
            <div className="col gap-8 flex-1 relative">
              <div className="row gap-5 w-full items-center">
                <Input
                  variant="underlined"
                  color="primary"
                  placeholder="Document title"
                  value={document.title}
                  classNames={{ input: 'text-1.5em font-bold placeholder:font-500 ' }}
                  onInput={(e) => update(e.currentTarget.value, 'title')}
                  description={document.id}
                />
                <div className="row-center gap-1">
                  <PriorityPopover
                    priority={document.priority}
                    onChanged={(p) => update(p, 'priority')}
                  />
                  <Tooltip content="Delete">
                    <Button
                      isIconOnly
                      variant="flat"
                      onClick={() => {
                        // TODO:
                      }}
                    >
                      <Icon icon="i-mdi-dots-vertical" className="text-zinc-600" />
                    </Button>
                  </Tooltip>
                </div>
              </div>
              <div>
                <Textarea
                  placeholder="Document short description"
                  maxLength={1000}
                  minRows={5}
                  maxRows={10}
                  description={`${document.shortDescription?.length}/1000`}
                  value={document.shortDescription}
                  onInput={(e) => update(e.currentTarget.value, 'shortDescription')}
                />
              </div>
              <Divider />
              <DocumentList
                initial={children}
                onCreated={(body) => createChild(body)}
                onDeleted={(id) => deleteChild(id)}
              />
            </div>
          </>
        )
      )}
    </div>
  );
};

export default DocumentPage;
