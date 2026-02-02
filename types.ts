
export interface ClockState {
  hour: number;
  minute: number;
  second: number;
  day: number;
  month: number;
  year: number;
  dayOfWeek: string;
  isLeapYear: boolean;
  timestamp: number;
  timezone: string;
}
