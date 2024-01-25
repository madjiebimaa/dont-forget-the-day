'use client';

import { cn } from '@/lib/utils';
import { useOpenSidebar } from '@/store/layout';

export default function Overlay() {
  const openSidebar = useOpenSidebar();

  return (
    <div
      className={cn(
        'absolute top-0 left-0 z-10 h-screen w-screen bg-black/50 opacity-0 invisible transition-opacity duration-300',
        openSidebar && 'opacity-100 md:opacity-0 visible md:invisible'
      )}
    />
  );
}
