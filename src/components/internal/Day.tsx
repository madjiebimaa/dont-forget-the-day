'use client';

import dayjs, { Dayjs } from 'dayjs';

import { Holiday } from '@/lib/types/types';
import { cn } from '@/lib/utils';
import { useSelectedDate } from '@/store/date';
import { useMemo } from 'react';

interface DayProps {
  day: Dayjs;
  weekIndex: number;
  holidays?: Holiday[];
}

export default function Day({ day, weekIndex, holidays }: DayProps) {
  const selectedDate = useSelectedDate();

  const isDayInFirstWeek = weekIndex === 0;
  const isCurrentDay = dayjs().format('YY-MM-DD') === day.format('YY-MM-DD');
  const isDayInSelectedMonth = selectedDate.month() === day.month();

  const currentHoliday = useMemo(
    () =>
      holidays &&
      holidays.find((holiday) => holiday.date === day.format('YYYY-MM-DD')),
    [holidays, day]
  );

  return (
    <div className={cn('flex flex-col justify-between p-2 bg-white')}>
      <header className="flex flex-col items-center gap-1">
        {isDayInFirstWeek && (
          <p className="font-semibold text-sm text-slate-400">
            {day.format('ddd').toUpperCase()}
          </p>
        )}
        <p
          className={cn(
            'grid place-content-center h-8 w-8 p-1 rounded-full font-medium text-sm text-slate-900',
            !isDayInSelectedMonth && 'text-slate-400',
            isCurrentDay && 'text-white bg-blue-400'
          )}
        >
          {day.format('DD')}
        </p>
      </header>

      {holidays && holidays.length !== 0 && currentHoliday && (
        <div className="flex flex-col justify-center items-center">
          <p className="grid place-content-center h-8 w-8 p-1 rounded-full font-medium text-sm text-white bg-red-400">
            {currentHoliday.events.length}
          </p>
        </div>
      )}
    </div>
  );
}
