export type NagerDateResponse = NagerDateHoliday[];

export interface NagerDateHoliday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: any;
  launchYear?: number;
  types: string[];
}
