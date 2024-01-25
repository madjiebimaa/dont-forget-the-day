import { HOLIDAY_API_KEY, HOLIDAY_API_URL } from './constans';
import { HolidayResponse } from './types/holiday';

export const getHolidayCountries = async (): Promise<HolidayResponse> => {
  const response = await fetch(
    `${HOLIDAY_API_URL}/v1/countries?pretty&key=${HOLIDAY_API_KEY}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.json();
};
