import { NextResponse } from 'next/server';

import { getHolidayCountries } from '@/lib/holiday';

export const GET = async (request: Request) => {
  try {
    const response = await getHolidayCountries();
    const countries = response.countries.map((country) => ({
      name: country.name,
      code: country.code,
    }));

    return NextResponse.json({
      countries,
    });
  } catch (error) {
    console.log(request.url, error);

    return NextResponse.json(
      { message: 'Error while get countries' },
      { status: 500 }
    );
  }
};
