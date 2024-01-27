import { clsx, type ClassValue } from 'clsx';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';
import { NagerDateHoliday } from './types/nager-date';
import { Holiday, HolidayEvent } from './types/types';

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

function isRepatedEvent(
  map: Map<Holiday['date'], HolidayEvent[]>,
  holiday: NagerDateHoliday
): boolean {
  return Boolean(
    map.get(holiday.date)!.find((event) => event.name === holiday.name)
  );
}

function generalizedRepatedEventCountryCode(
  map: Map<Holiday['date'], HolidayEvent[]>,
  holiday: NagerDateHoliday
): HolidayEvent[] {
  const events = map.get(holiday.date)!.map((event) => {
    if (event.name === holiday.name) {
      return {
        name: event.name,
        countryCode: 'GLOBAL',
      };
    }

    return event;
  }) as HolidayEvent[];

  return events;
}

function isDateHasEvent(
  map: Map<Holiday['date'], HolidayEvent[]>,
  holiday: NagerDateHoliday
): boolean {
  return map.get(holiday.date)!.includes({
    name: holiday.name,
    countryCode: holiday.countryCode,
  });
}

export function createEventsInDate(
  holidays: NagerDateHoliday[]
): Map<Holiday['date'], HolidayEvent[]> {
  const map: Map<Holiday['date'], HolidayEvent[]> = new Map();
  holidays.forEach((holiday) => {
    if (!map.has(holiday.date)) {
      return map.set(holiday.date, [
        { name: holiday.name, countryCode: holiday.countryCode },
      ]);
    }

    if (isRepatedEvent(map, holiday)) {
      const events = generalizedRepatedEventCountryCode(map, holiday);
      return map.set(holiday.date, events);
    }

    return (
      isDateHasEvent(map, holiday) ||
      map.set(holiday.date, [
        ...map.get(holiday.date)!,
        { name: holiday.name, countryCode: holiday.countryCode },
      ])
    );
  });

  return map;
}
