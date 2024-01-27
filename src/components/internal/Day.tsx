'use client';

import dayjs, { Dayjs } from 'dayjs';
import { useMemo } from 'react';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

import { Holiday } from '@/lib/types/types';
import { cn } from '@/lib/utils';
import { useSelectedDate } from '@/store/date';

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

      {currentHoliday && currentHoliday.events.length !== 0 && (
        <div className="flex flex-col justify-center items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="h-8 w-8 p-1 rounded-full font-medium text-sm text-white bg-red-400 hover:bg-red-400/80">
                {currentHoliday.events.length}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{"Don't Forget About This Day"}</DialogTitle>
              </DialogHeader>
              {currentHoliday.events.map((event) => (
                <div key={event.name} className="flex items-center">
                  {event.countryCode === 'GLOBAL' ? (
                    <span
                      className={cn(
                        'shrink-0 h-6 w-6 mr-2 bg-gradient-to-r from-green-200 via-green-300 to-blue-500 rounded-full shadow-md'
                      )}
                    />
                  ) : (
                    <span
                      className={cn(
                        'shrink-0 h-6 w-6 mr-2 rounded-full shadow-md',
                        `fib fis fi-${event.countryCode.toLowerCase()}`
                      )}
                    />
                  )}
                  <p className="text-sm text-slate-900">{event.name}</p>
                </div>
              ))}
            </DialogContent>
          </Dialog>
          {/* <Dialog>
            <DialogTrigger asChild></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{"Don't Forget About This Day"}</DialogTitle>
              </DialogHeader>
              {currentHoliday.events.map((event) => (
                <div key={event.name} className="flex items-center">
                  <span
                    className={cn(
                      'shrink-0 h-6 w-6 mr-2 rounded-full shadow-md cursor-pointer transition-transform duration-300 ease-in hover:scale-110 hover:transition-transform hover:duration-300 hover:ease-out',
                      `fib fis fi-${event.countryCode.toLowerCase()}`
                    )}
                  />
                  <p className="text-sm text-slate-900">{event.name}</p>
                </div>
              ))}
            </DialogContent>
          </Dialog> */}
        </div>
      )}
    </div>
  );
}
