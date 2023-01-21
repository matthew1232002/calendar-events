import dayjs from 'dayjs';
import { EventItem } from './types';
import html2canvas from 'html2canvas';

export function getMonth(month = dayjs().month()) {
  month = Math.floor(month);
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfTheMonth;
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });
  return daysMatrix;
}

export const exportDataJson = (filteredEvents: EventItem[]) => {
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(filteredEvents)
  )}`;
  const link = document.createElement('a');
  link.href = jsonString;
  link.download = 'data.json';

  link.click();
};

export const getElementAsImage = (elementId: string) => {
  html2canvas(document.getElementById(elementId)!).then((canvas) => {
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/jpeg');
    a.download = 'image.jpeg';
    a.click();
  });
};
