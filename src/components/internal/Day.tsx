'use client';

import dayjs, { Dayjs } from 'dayjs';

import { cn } from '@/lib/utils';
import { useSelectedDate } from '@/store/date';

interface DayProps {
  day: Dayjs;
  weekIndex: number;
}

export default function Day({ day, weekIndex }: DayProps) {
  const selectedDate = useSelectedDate();

  const isDayInFirstWeek = weekIndex === 0;
  const isCurrentDay = dayjs().format('DD-MM-YY') === day.format('DD-MM-YY');
  const isDayInSelectedMonth = selectedDate.month() === day.month();

  return (
    <div className={cn('flex flex-col p-2 bg-white')}>
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
    </div>
  );
}
