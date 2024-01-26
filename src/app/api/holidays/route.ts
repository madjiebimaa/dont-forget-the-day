import dayjs from 'dayjs';
import { NextResponse } from 'next/server';

import { getNagerDateHolidays } from '@/lib/nager-date';
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

    const responses = await Promise.all(
      countryCodes.map((countryCode) =>
        getNagerDateHolidays({ countryCode, year: parseInt(year) })
      )
    );

    const holidays = responses.reduce(
      (prevValue, holiday) => prevValue.concat(holiday),
      []
    );

    const holidaysInThisMonth = holidays.filter(
      (holiday) =>
        holiday.date.slice(0, 7) ===
        `${year}-${String(parseInt(month) + 1).padStart(2, '0')}`
    );

    return NextResponse.json({
      holidays: Array.from(
        createEventsInDate(holidaysInThisMonth),
        ([date, events]) => ({
          date,
          events,
        })
      ),
    });
  } catch (error) {
    console.log(request.url, error);

    return NextResponse.json(
      { message: 'Error while get holidays' },
      { status: 500 }
    );
  }
};
