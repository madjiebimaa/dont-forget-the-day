import { BASE_URL } from './constans';
import { GetHolidayParams } from './types/params';
import { Country, Holiday } from './types/types';
import { httpClient } from './utils';

export const getCountries = async (): Promise<{ countries: Country[] }> => {
  const response = await httpClient(`${BASE_URL}/api/countries`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};

export const getHolidays = async ({
  countryCodes,
  month,
  year,
}: GetHolidayParams): Promise<{ holidays: Holiday[] }> => {
  const response = await httpClient(
    `${BASE_URL}/api/holidays?month=${month}&year=${year}`,
    {
      method: 'POST',
      body: JSON.stringify({ countryCodes }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.json();
};
