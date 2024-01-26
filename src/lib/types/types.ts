export interface Country {
  code: string;
  name: string;
}

export interface HolidayEvent {
  name: string;
  countryCode: string;
}

export interface Holiday {
  date: string;
  events: HolidayEvent[];
}
