'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';

import { Button } from '../ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';

import { cn } from '@/lib/utils';
import { useCountryActions, useSelectedCountries } from '@/store/country';
import { useLayoutActions, useOpenCollapsible } from '@/store/layout';

export default function CountryCollapsible() {
  const openCollapsible = useOpenCollapsible();
  const selectedCountries = useSelectedCountries();
  const layoutActions = useLayoutActions();
  const countryActions = useCountryActions();

  const Icon = openCollapsible ? ChevronUp : ChevronDown;

  return (
    <Collapsible
      open={openCollapsible}
      onOpenChange={layoutActions.toggleOpenCollapsible}
      className="p-2"
    >
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="justify-between w-full">
          <span className="text-slate-900">Your countries</span>
          <Icon className="shrink-0 h-4 w-4 text-slate-900 opacity-50" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="grid place-content-center grid-cols-7 gap-1">
        {selectedCountries.map((selectedCountry) => (
          <span
            key={selectedCountry.code}
            className={cn(
              'shrink-0 h-6 w-6 mr-2 rounded-full shadow-md cursor-pointer transition-transform duration-300 ease-in hover:scale-110 hover:transition-transform hover:duration-300 hover:ease-out',
              `fib fis fi-${selectedCountry.code.toLowerCase()}`
            )}
            onClick={() =>
              countryActions.toggleSelectedCountry(selectedCountry)
            }
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
