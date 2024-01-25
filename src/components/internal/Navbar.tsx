'use client';

import { SidebarClose, SidebarOpen } from 'lucide-react';

import { Button } from '../ui/button';

import { cn } from '@/lib/utils';
import { useLayoutActions, useOpenSidebar } from '@/store/layout';

export default function Navbar() {
  const openSidebar = useOpenSidebar();
  const layoutActions = useLayoutActions();

  const Icon = openSidebar ? SidebarClose : SidebarOpen;

  return (
    <nav className="flex items-center justify-between">
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
    </nav>
  );
}
