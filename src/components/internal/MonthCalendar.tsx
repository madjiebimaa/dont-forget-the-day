'use client';

import { useMemo } from 'react';

import Day from './Day';

import { getMonth } from '@/lib/utils';
import { useSelectedDate } from '@/store/date';

export default function MonthCalendar() {
  const selectedDate = useSelectedDate();
  const month = useMemo(() => getMonth(selectedDate.month()), [selectedDate]);

  return (
    <section className="flex-1 grid grid-cols-7 grid-rows-5 gap-[1px]">
      {month.map((week, weekIndex) =>
        week.map((day) => (
          <Day key={day.toISOString()} day={day} weekIndex={weekIndex} />
        ))
      )}
    </section>
  );
}
