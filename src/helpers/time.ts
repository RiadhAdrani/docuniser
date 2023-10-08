import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Language } from 'types';
import 'dayjs/locale/fr';
import 'dayjs/locale/en';

dayjs.extend(relativeTime);

export const timeAgo = (date: dayjs.Dayjs | Date | string, locale: Language = 'en') => {
  dayjs.locale(locale);

  return dayjs(date).fromNow();
};
