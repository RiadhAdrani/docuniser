import { useMemo, useState } from 'react';
import { Document } from '../../types/index';
import dayjs from 'dayjs';
import { sortPriority } from '@/helpers/document';

export default (list: Array<Document>) => {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<
    'Title' | 'Created At' | 'Updated At' | 'Priority' | undefined
  >();
  const [asc, setAsc] = useState(true);

  const docs = useMemo<Array<Document>>(() => {
    let out: Array<Document> = !query.trim()
      ? list
      : list.filter((it) => {
          return it.title.trim().toLowerCase().includes(query.trim().toLocaleLowerCase());
        });

    if (sort === undefined) {
      return out;
    }

    switch (sort) {
      case 'Created At':
        out = out.sort((a, b) => dayjs(a.createdAt).diff(b.createdAt));
        break;
      case 'Updated At':
        out = out.sort((a, b) => dayjs(a.updatedAt).diff(b.updatedAt));
        break;
      case 'Priority':
        out = out.sort((a, b) => sortPriority(a.priority, b.priority));
        break;
      case 'Title':
        out = out.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    if (!asc) return out.reverse();

    return out;
  }, [query, asc, sort, list]);

  return { sort, setSort, asc, setAsc, docs, query, setQuery };
};
