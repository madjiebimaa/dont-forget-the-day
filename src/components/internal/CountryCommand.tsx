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
import { useSelectedCountries } from '@/store/country';

export default function CountryCommand() {
  const selectedCountries = useSelectedCountries();
  const { data, isLoading } = useCountries({
    enabled: Boolean(selectedCountries),
  });

  return (
    <Command className="p-2 rounded-none min-h-[522px] h-fit border-b border-b-slate-100">
      <CommandInput placeholder="Type a country name..." />
      <CommandList className='min-h-[90%]'>
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
