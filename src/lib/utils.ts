import { clsx, type ClassValue } from 'clsx';
import dayjs, { Dayjs } from 'dayjs';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function httpClient(input: RequestInfo | URL, init?: RequestInit) {
  const promise = new Promise<Response>(async (resolve, reject) => {
    try {
      const response = await fetch(input, init);
      if (!response.ok) {
        reject(response);
      }

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

  return promise;
}

export function trimText(text: string, max: number = 17) {
  return text.length > max
    ? [...text.slice(0, max).split(''), '...'].join('')
    : text;
}

export function getMonth(month = dayjs().month()) {
  const year = dayjs().year();
  const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();

  let currentMonthCount = 0 - firstDayOfMonth;
  const daysMatrix = new Array(5).fill(null).map(() =>
    new Array(7).fill(null).map(() => {
      currentMonthCount++;

      return dayjs(new Date(year, month, currentMonthCount));
    })
  );

  return daysMatrix;
}

export function isCurrentDay(day: Dayjs): boolean {
  return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY');
}

export function isDayInCurrentMonth(day: Dayjs): boolean {
  return day.month() === dayjs().month();
}
