'use client';

import { useMemo } from 'react';

import { getMonth } from '@/lib/utils';
import Day from './Day';

export default function MonthCalendar() {
  const month = useMemo(() => getMonth(), []);

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
