import { NAGER_DATE_URL } from './constans';
import { NagerDateResponse } from './types/nager-date';
import { getNagerDateHolidaysParams } from './types/params';

export const getNagerDateHolidays = async ({
  countryCode,
  year,
}: getNagerDateHolidaysParams): Promise<NagerDateResponse> => {
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
