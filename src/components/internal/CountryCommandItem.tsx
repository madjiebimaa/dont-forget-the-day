'use client';

import { Check } from 'lucide-react';

import { CommandItem } from '../ui/command';

import { Country } from '@/lib/types/types';
import { cn, trimText } from '@/lib/utils';
import { useCountryActions, useSelectedCountries } from '@/store/country';

interface CountryCommandItemProps {
  country: Country;
}

export default function CountryCommandItem({
  country,
}: CountryCommandItemProps) {
  const selectedCountries = useSelectedCountries();
  const countryActions = useCountryActions();

  return (
    <CommandItem
      value={country.name}
      onSelect={() => countryActions.toggleSelectedCountry(country)}
      className="cursor-pointer"
    >
      <Check
        className={cn(
          'shrink-0 h-4 w-4 mr-2 text-slate-900 transition-opacity',
          selectedCountries.includes(country) ? 'opacity-100' : 'opacity-0'
        )}
      />
      <span
        className={cn(
          'shrink-0 h-6 w-6 mr-2 bg-white rounded-full shadow-md',
          `fib fis fi-${country.code.toLowerCase()}`
        )}
      />
      <span className="text-slate-900">{trimText(country.name)}</span>
    </CommandItem>
  );
}
