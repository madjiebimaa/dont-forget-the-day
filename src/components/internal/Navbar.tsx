'use client';

import {
  ChevronLeft,
  ChevronRight,
  SidebarClose,
  SidebarOpen,
} from 'lucide-react';

import { Button } from '../ui/button';

import { cn } from '@/lib/utils';
import { useDateActions, useSelectedDate } from '@/store/date';
import { useLayoutActions, useOpenSidebar } from '@/store/layout';

export default function Navbar() {
  const openSidebar = useOpenSidebar();
  const selectedDate = useSelectedDate();
  const layoutActions = useLayoutActions();
  const dateActions = useDateActions();

  const Icon = openSidebar ? SidebarClose : SidebarOpen;

  return (
    <nav className="flex items-center justify-start gap-4 p-2">
      <Button
        variant="ghost"
        className={cn(
          'shrink-0 h-8 w-8 p-1 opacity-100 transition-opacity duration-300',
          openSidebar && 'opacity-0'
        )}
        onClick={() => layoutActions.toggleOpenSidebar()}
      >
        <Icon className="shrink-0 h-6 w-6 text-slate-900 opacity-50" />
      </Button>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          className={cn('shrink-0 h-8 w-8 p-1')}
          onClick={() => dateActions.prevMonth()}
        >
          <ChevronLeft className="shrink-0 h-6 w-6 text-slate-900 opacity-50" />
        </Button>
        <Button
          variant="ghost"
          className={cn('shrink-0 h-8 w-8 p-1')}
          onClick={() => dateActions.nextMonth()}
        >
          <ChevronRight className="shrink-0 h-6 w-6 text-slate-900 opacity-50" />
        </Button>
      </div>
      <p className="font-medium text-xl text-slate-600">
        {selectedDate.format('MMMM YYYY')}
      </p>
    </nav>
  );
}
