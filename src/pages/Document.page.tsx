import PriorityPopover from '@/components/Document/Document.PriorityPopover';
import { DataContext } from '@/context/Data.context';
import { Button, Divider, Input, Navbar, NavbarBrand, Textarea, Tooltip } from '@nextui-org/react';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchEvent } from '@/helpers/utils';
import { Events, Document, UpdateDocumentBody } from '../../types';
import { useDebounce } from 'usehooks-ts';
import Icon from '@/components/Icon/Icon';

const DocumentPage = () => {
  const { updateDocument } = useContext(DataContext);

  const [search] = useSearchParams();

  const id = useMemo(() => search.get('id'), [search.get('id')]);

  const [state, setState] = useState<'done' | 'loading' | 'error'>('loading');

  const [document, setDocument] = useState<Document | undefined>(undefined);

  const [queue, setQueue] = useState<Omit<UpdateDocumentBody, 'id'>>({});

  const debouncedQueue = useDebounce(queue, 1000);

  const update: <T>(value: T, key: keyof Document) => void = (value, key) => {
    if (!document) return;

    setDocument({ ...document, [key]: value });
    setQueue({ [key]: value });
  };

  useEffect(() => {
    setState('loading');

    fetchEvent<string, Document>(Events.getDocument, `${id}`)
      .then((res) => {
        const { data } = res;

        setDocument(data);
        setState('done');
      })
      .catch(() => setState('error'));
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
  }, [debouncedQueue]);

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
                  description="Document title"
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
                  placeholder="Organizing ideas for my project..."
                  maxLength={1000}
                  minRows={5}
                  maxRows={10}
                  description="Describe the documents in a short paragraph"
                  value={document.shortDescription}
                />
              </div>
              <Divider />
              <div className="flex-1 overflow-y-hidden">
                <div className="h-1000px"></div>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default DocumentPage;
