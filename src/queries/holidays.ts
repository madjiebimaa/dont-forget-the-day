import { UseQueryOptions, UseQueryResult, useQuery } from 'react-query';

import { getHolidays } from '@/lib/apis';
import { Holiday } from '@/lib/types/types';

export const useHolidays = (
  countryCode: string,
  year: number,
  config?: Omit<
    UseQueryOptions<{ holidays: Holiday[] }, Error>,
    'queryKey' | 'queryFn'
  >
): UseQueryResult<{ holidays: Holiday[] }, Error> => {
  return useQuery<{ holidays: Holiday[] }, Error>({
    ...config,
    queryKey: ['/holidays', countryCode, year],
    queryFn: (): Promise<{ holidays: Holiday[] }> =>
      getHolidays(countryCode, year),
  });
};
