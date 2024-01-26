'use client';

import { useMemo } from 'react';

import Day from './Day';

import { getMonth } from '@/lib/utils';
import { useHolidays } from '@/queries/holidays';
import { useSelectedCountries } from '@/store/country';
import { useSelectedDate } from '@/store/date';

export default function MonthCalendar() {
  const selectedCountries = useSelectedCountries();
  const selectedDate = useSelectedDate();

  const month = useMemo(() => getMonth(selectedDate.month()), [selectedDate]);
  const countryCodes = useMemo(
    () => selectedCountries.map((selectedCountry) => selectedCountry.code),
    [selectedCountries]
  );

  const { data, isLoading } = useHolidays({
    countryCodes,
    month: selectedDate.month(),
    year: selectedDate.year(),
  });

  console.log({ data: data?.holidays, isLoading });

  return (
    <section className="flex-1 grid grid-cols-7 grid-rows-5 gap-[1px] pt-[1px] bg-slate-100">
      {month.map((week, weekIndex) =>
        week.map((day) => (
          <Day
            key={day.toISOString()}
            day={day}
            weekIndex={weekIndex}
            holidays={data && data.holidays}
          />
        ))
      )}
    </section>
  );
}
