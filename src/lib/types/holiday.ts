export interface HolidayResponse {
  status: number;
  requests: HolidayRequests;
  countries: HolidayCountry[];
}

export interface HolidayRequests {
  used: number;
  available: number;
  resets: string;
}

export interface HolidayCountry {
  code: string;
  name: string;
  codes: HolidayCodes;
  languages: string[];
  currencies: HolidayCurrency[];
  flag: string;
  subdivisions: HolidaySubdivision[];
  weekend: HolidayWeekend[];
}

export interface HolidayCodes {
  'alpha-2': string;
  'alpha-3': string;
  numeric: string;
}

export interface HolidayCurrency {
  alpha: string;
}

export interface HolidaySubdivision {
  code: string;
  name: string;
  languages: string[];
  subdivisions?: HolidaySubdivision[];
}

export interface HolidayWeekend {
  name: string;
  numeric: number;
}
