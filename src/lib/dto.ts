import { HolidayCountry } from './types/holiday';
import { Country } from './types/types';

export const simplifyCountries = (countries: HolidayCountry[]): Country[] => {
  return countries.map((country) => ({
    name: country.name,
    code: country.code,
  }));
};
