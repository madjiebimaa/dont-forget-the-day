import { HolidayCountry } from './types/holiday';
import { NagerDateHoliday } from './types/nager-date';
import { Country, Holiday } from './types/types';

export const simplifyCountries = (countries: HolidayCountry[]): Country[] => {
  return countries.map((country) => ({
    name: country.name,
    code: country.code,
  }));
};

export const simplifyHolidays = (holidays: NagerDateHoliday[]): Holiday[] => {
  return holidays.map((holiday) => ({
    name: holiday.name,
    date: holiday.date,
  }));
};
