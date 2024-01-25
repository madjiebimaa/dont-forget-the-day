import { BASE_URL } from './constans';
import { Country } from './types/types';

export const getCountries = async (): Promise<{ countries: Country[] }> => {
  const response = await fetch(`${BASE_URL}/api/countries`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};
