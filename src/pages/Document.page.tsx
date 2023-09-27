import PriorityPopover from '@/components/Document/Document.PriorityPopover';
import { DataContext } from '@/context/Data.context';
import { Input } from '@nextui-org/react';
import { useContext, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Priority, Document } from '../../types';

const DocumentPage = () => {
  const { getDocument } = useContext(DataContext);

  const [search] = useSearchParams();

  const originalDocument = useMemo(() => getDocument(search.get('id') as string), [search]);

  const [document, setDocument] = useState(originalDocument);

  const update: <T>(value: T, key: keyof Document) => void = (value, key) => {
    if (!document) return;

    setDocument({ ...document, [key]: value });
  };

  return (
    <div className="col p-2 flex-1">
      {!document ? (
        <div className="col-center m-y-auto text-zinc-400 w-full h-full text-1.75em">
          <span className="i-mdi-text-box-remove-outline text-1.5em" />
          <p>Oops</p>
          <p className="text-0.7em">
            We were unable to load this document, or it may have been deleted.
          </p>
        </div>
      ) : (
        <div className="col">
          <div className="row gap-5 w-full items-center">
            <Input
              variant="underlined"
              color="primary"
              placeholder="Document title"
              value={document.title}
              classNames={{ input: 'text-1.5em font-bold placeholder:font-500' }}
              onInput={(e) => update(e.currentTarget.value, 'title')}
            />
            <PriorityPopover
              priority={document.priority}
              onChanged={(p) => update(p, 'priority')}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentPage;
