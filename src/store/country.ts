import { create } from 'zustand';

import { Country } from '@/lib/types/types';
import { createJSONStorage, persist } from 'zustand/middleware';

type CountryState = {
  selectedCountries: Country[];
};

type CountryActions = {
  actions: {
    toggleSelectedCountry: (country: Country) => void;
  };
};

const initialState: CountryState = {
  selectedCountries: [],
};

const countryStore = create<CountryState & CountryActions>()(
  persist(
    (set) => ({
      ...initialState,
      actions: {
        toggleSelectedCountry: (country) =>
          set((state) => {
            const isCountryExist = state.selectedCountries.find(
              (selectedCountry) => selectedCountry.code === country.code
            );
            if (isCountryExist) {
              return {
                selectedCountries: state.selectedCountries.filter(
                  (selectedCountry) => selectedCountry.code !== country.code
                ),
              };
            }

            return {
              selectedCountries: [...state.selectedCountries, country],
            };
          }),
      },
    }),
    {
      name: 'country-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        selectedCountries: state.selectedCountries,
      }),
    }
  )
);

export const useSelectedCountries = () =>
  countryStore((state) => state.selectedCountries);
export const useCountryActions = () => countryStore((state) => state.actions);
