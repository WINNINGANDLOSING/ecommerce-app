export const handleConvertFromTimestampToDate = (timestamp: any): Date => {
  if (typeof timestamp === 'string') {
    return new Date(timestamp);
  }
  if (
    !timestamp ||
    typeof timestamp.seconds !== 'number' ||
    typeof timestamp.nanoseconds !== 'number'
  ) {
    return timestamp; // if not in the above format, just return the date
  }

  return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
};

export const getFormattedDate = (date: Date) => {
  const time = date.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const day = date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });

  return `${time} - ${day}`;
};
