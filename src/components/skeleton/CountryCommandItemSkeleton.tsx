import { CommandItem } from '@/components/ui/command';
import { Skeleton } from '@/components/ui/skeleton';

export default function CountryCommandItemSkeleton() {
  return (
    <CommandItem className="flex justify-start items-center px-2 py-1.5">
      <Skeleton className="shrink-0 h-4 w-4 mr-2 bg-slate-200" />
      <Skeleton className="shrink-0 h-6 w-6 rounded-full mr-2 bg-slate-200" />
      <Skeleton className="shrink-0 h-6 flex-1" />
    </CommandItem>
  );
}
