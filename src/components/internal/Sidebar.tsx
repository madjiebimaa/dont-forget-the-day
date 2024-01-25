'use client';

import { SidebarClose, SidebarOpen } from 'lucide-react';

import { Button } from '../ui/button';
import CountryCommand from './CountryCommand';

import { cn } from '@/lib/utils';
import { useLayoutActions, useOpenSidebar } from '@/store/layout';

export default function Sidebar() {
  const openSidebar = useOpenSidebar();
  const layoutActions = useLayoutActions();

  const Icon = openSidebar ? SidebarClose : SidebarOpen;

  return (
    <aside
      className={cn(
        'shrink-0 z-20 flex flex-col fixed md:static h-screen w-[260px] max-w-[260px] border-r border-r-slate-100 transition-all duration-300',
        !openSidebar && '-ml-[260px]'
      )}
    >
      <section className="flex items-center justify-end min-h-14 p-2">
        <Button
          variant="ghost"
          className={cn(
            'shrink-0 h-8 w-8 p-1 opacity-0 transition-opacity duration-300',
            openSidebar && 'opacity-100'
          )}
          onClick={() => layoutActions.toggleOpenSidebar()}
        >
          <Icon className="shrink-0 h-6 w-6 text-slate-900 opacity-50" />
        </Button>
      </section>
      <span className='pt-1 border-t border-t-slate-100'/>
      <CountryCommand />
    </aside>
  );
}
