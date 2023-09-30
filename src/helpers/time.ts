import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const timeAgo = (date: dayjs.Dayjs | Date | string) => dayjs(date).fromNow();
