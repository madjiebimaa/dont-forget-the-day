'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from '@/components/ui/command';
import CountryCommandItem from './CountryCommandItem';
import CountryCommandItemSkeleton from '../skeleton/CountryCommandItemSkeleton';

import { useCountries } from '@/queries/country';
import { useSelectedCountries } from '@/store/country';

export default function CountryCommand() {
  const selectedCountries = useSelectedCountries();
  const { data, isLoading } = useCountries();

  return (
    <Command className="rounded-none">
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
              <CountryCommandItem
                key={country.code}
                country={country}
                selectedCountries={selectedCountries}
              />
            ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
