import dayjs, { Dayjs } from 'dayjs';

export const getCurrentDayClass = (day: Dayjs) => {
  return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
    ? { backgroundColor: 'lightblue', borderRadius: '50%' }
    : {};
};
