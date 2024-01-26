import dayjs from 'dayjs';
import { NextResponse } from 'next/server';

import { getNagerDateHolidays } from '@/lib/nager-date';
import { NagerDateResponse } from '@/lib/types/nager-date';
import { createEventsInDate } from '@/lib/utils';

export const POST = async (request: Request) => {
  const { searchParams } = new URL(request.url);

  const today = dayjs();
  const month = searchParams.get('month') || today.month().toString();
  const year = searchParams.get('year') || today.year().toString();

  try {
    const { countryCodes } = (await request.json()) as {
      countryCodes: string[];
    };

    const settledResponses = await Promise.allSettled(
      countryCodes.map(async (countryCode) => {
        try {
          const response = await getNagerDateHolidays({
            countryCode,
            year: parseInt(year),
          });

          return Promise.resolve(response);
        } catch {
          return Promise.reject(countryCode);
        }
      })
    );

    let responses: NagerDateResponse[] = [];
    let rejectedCountryCodes: string[] = [];
    settledResponses.forEach((settledResponse) => {
      if (settledResponse.status === 'fulfilled') {
        responses.push(settledResponse.value as NagerDateResponse);
      } else {
        rejectedCountryCodes.push(settledResponse.reason as string);
      }
    });

    const holidays = responses.reduce(
      (prevValue, holiday) => prevValue.concat(holiday),
      []
    );

    const holidaysInThisMonth = holidays.filter(
      (holiday) =>
        holiday.date.slice(0, 7) ===
        `${year}-${String(parseInt(month)).padStart(2, '0')}`
    );

    return NextResponse.json({
      holidays: Array.from(
        createEventsInDate(holidaysInThisMonth),
        ([date, events]) => ({
          date,
          events,
        })
      ),
      rejectedCountryCodes,
    });
  } catch (error) {
    console.log(request.url, error);

    return NextResponse.json(
      { message: 'Error while get holidays' },
      { status: 500 }
    );
  }
};
