'use client';

import { useEffect, useMemo } from 'react';
import { toast } from 'sonner';

import Day from './Day';

import { getMonth } from '@/lib/utils';
import { useCountries } from '@/queries/country';
import { useHolidays } from '@/queries/holidays';
import { useCountryActions, useSelectedCountries } from '@/store/country';
import { useSelectedDate } from '@/store/date';

export default function MonthCalendar() {
  const selectedCountries = useSelectedCountries();
  const selectedDate = useSelectedDate();
  const countryActions = useCountryActions();

  const month = useMemo(() => getMonth(selectedDate.month()), [selectedDate]);
  const countryCodes = useMemo(
    () => selectedCountries.map((selectedCountry) => selectedCountry.code),
    [selectedCountries]
  );

  const { data: dataHolidays } = useHolidays({
    countryCodes,
    month: selectedDate.month() + 1,
    year: selectedDate.year(),
  });

  const { data: dataCountries } = useCountries({
    enabled: Boolean(dataHolidays),
  });

  const rejectedCountries = useMemo(
    () =>
      dataCountries &&
      dataCountries.countries.filter(
        (country) =>
          dataHolidays &&
          dataHolidays.rejectedCountryCodes.includes(country.code)
      ),
    [dataCountries, dataHolidays]
  );

  useEffect(() => {
    if (rejectedCountries && rejectedCountries.length !== 0) {
      rejectedCountries.forEach((rejectedCountry) => {
        toast(
          `Sorry, we don't have holiday data for the ${rejectedCountry.name}.`
        );

        countryActions.toggleSelectedCountry(rejectedCountry);
      });
    }
  }, [countryActions, rejectedCountries]);

  return (
    <section className="flex-1 grid grid-cols-7 grid-rows-5 gap-[1px] pt-[1px] bg-slate-100">
      {month.map((week, weekIndex) =>
        week.map((day) => (
          <Day
            key={day.toISOString()}
            day={day}
            weekIndex={weekIndex}
            holidays={dataHolidays && dataHolidays.holidays}
          />
        ))
      )}
    </section>
  );
}
