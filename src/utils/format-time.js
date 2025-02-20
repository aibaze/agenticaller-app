import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fTimehourMinutes(date) {
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${hour}:${minute.toString().padStart(2, '0')}`;
}

export function fToNow(date) {
  if (!date) return '';

  const now = new Date();
  const targetDate = new Date(date);
  const diffInMilliseconds = now - targetDate;
  const diffInHours = diffInMilliseconds / (1000 * 60 * 60);

  if (diffInHours < 24) {
    const hours = Math.floor(diffInHours);
    return `${hours} hours ago`;
  } else {
    return formatDistanceToNow(targetDate, { addSuffix: true });
  }
}
