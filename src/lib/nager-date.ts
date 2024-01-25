import { NAGER_DATE_URL } from './constans';
import { NagerDateResponse } from './types/nager-date';

export const getNagerDateHolidays = async (
  countryCode: string,
  year: number
): Promise<NagerDateResponse> => {
  const response = await fetch(
    `${NAGER_DATE_URL}/api/v3/PublicHolidays/${year}/${countryCode}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.json();
};
