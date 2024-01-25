import dayjs from 'dayjs';
import { NextResponse } from 'next/server';

import { simplifyHolidays } from '@/lib/dto';
import { getNagerDateHolidays } from '@/lib/nager-date';

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);

  const countryCode = searchParams.get('countryCode') || 'ID';
  const year = searchParams.get('year') || dayjs().year().toString();

  try {
    const response = await getNagerDateHolidays(countryCode, parseInt(year));
    const simpleResponse = simplifyHolidays(response);

    return NextResponse.json({
      holidays: simpleResponse,
    });
  } catch (error) {
    console.log(request.url, error);

    return NextResponse.json(
      {
        message: `Error while get holidays of ${countryCode} country at ${year} year`,
      },
      { status: 500 }
    );
  }
};
