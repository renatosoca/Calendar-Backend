import dayjs from 'dayjs';

export const isDate = (value: string): boolean => {
  if (!value) return false;

  const day = dayjs(value);
  if (!day.isValid()) return false;

  return true;
}