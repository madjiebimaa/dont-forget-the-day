import { UseQueryOptions, UseQueryResult, useQuery } from 'react-query';

import { getHolidays } from '@/lib/apis';
import { GetHolidayParams } from '@/lib/types/params';
import { Holiday } from '@/lib/types/types';

export const useHolidays = (
  params: GetHolidayParams,
  config?: Omit<
    UseQueryOptions<{ holidays: Holiday[] }, Error>,
    'queryKey' | 'queryFn'
  >
): UseQueryResult<{ holidays: Holiday[] }, Error> => {
  return useQuery<{ holidays: Holiday[] }, Error>({
    ...config,
    queryKey: ['/holidays', params.countryCodes, params.month, params.year],
    queryFn: (): Promise<{ holidays: Holiday[] }> => getHolidays(params),
  });
};
