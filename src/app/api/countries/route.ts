import { NextResponse } from 'next/server';

import { simplifyCountries } from '@/lib/dto';
import { getHolidayCountries } from '@/lib/holiday';

export const GET = async (request: Request) => {
  try {
    const response = await getHolidayCountries();
    const simpleResponse = simplifyCountries(response.countries);

    return NextResponse.json({
      countries: simpleResponse,
    });
  } catch (error) {
    console.log(request.url, error);

    return NextResponse.json(
      { message: 'Error while get countries' },
      { status: 500 }
    );
  }
};
