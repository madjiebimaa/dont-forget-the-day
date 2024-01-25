'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from '@/components/ui/command';
import CountryCommandItemSkeleton from '../skeleton/CountryCommandItemSkeleton';
import CountryCommandItem from './CountryCommandItem';

import { useCountries } from '@/queries/country';

export default function CountryCommand() {
  const { data, isLoading } = useCountries();

  return (
    <Command className="p-2 rounded-none">
      <CommandInput placeholder="Type a country name..." />
      <CommandList className="min-h-full">
        <CommandEmpty>No countries found.</CommandEmpty>
        <CommandGroup>
          {isLoading &&
            Array(40)
              .fill(null)
              .map((_, index) => <CountryCommandItemSkeleton key={index} />)}
          {data &&
            data.countries.map((country) => (
              <CountryCommandItem key={country.code} country={country} />
            ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
