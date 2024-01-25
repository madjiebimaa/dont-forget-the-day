import { Dayjs } from 'dayjs';

import { cn, isCurrentDay, isDayInCurrentMonth } from '@/lib/utils';

interface DayProps {
  day: Dayjs;
  weekIndex: number;
}

export default function Day({ day, weekIndex }: DayProps) {
  const isDayInFirstWeek = weekIndex === 0;

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
            isCurrentDay(day) && 'text-white bg-blue-400',
            !isDayInCurrentMonth(day) && 'text-slate-400'
          )}
        >
          {day.format('DD')}
        </p>
      </header>
    </div>
  );
}
