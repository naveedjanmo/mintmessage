import dayjs from 'dayjs';

export function formatDate(timestamp) {
  return dayjs(timestamp).format('MMM D YYYY');
}

export const formatAddress = (address) =>
  address.slice(0, 4) + '...' + address.slice(-4);
