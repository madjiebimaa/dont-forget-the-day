import { BASE_URL } from './constans';
import { Country, Holiday } from './types/types';

export const getCountries = async (): Promise<{ countries: Country[] }> => {
  const response = await fetch(`${BASE_URL}/api/countries`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};

export const getHolidays = async (
  countryCode: string,
  year: number
): Promise<{ holidays: Holiday[] }> => {
  const response = await fetch(
    `${BASE_URL}/api/holidays?countryCode=${countryCode}&year=${year}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.json();
};
