import { UseQueryOptions, UseQueryResult, useQuery } from 'react-query';

import { getCountries } from '@/lib/apis';
import { Country } from '@/lib/types/types';

export const useCountries = (
  config?: Omit<
    UseQueryOptions<{ countries: Country[] }, Error>,
    'queryKey' | 'queryFn'
  >
): UseQueryResult<{ countries: Country[] }, Error> => {
  return useQuery<{ countries: Country[] }, Error>({
    ...config,
    queryKey: 'countries',
    queryFn: async (): Promise<{ countries: Country[] }> => getCountries(),
  });
};
