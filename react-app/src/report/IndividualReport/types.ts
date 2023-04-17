import { Log } from "../../types/LogType";

export type Dates = {
  startDate: string;
  endDate: string;
};

export type IndividualSessionInformation = {
  dateRange: Dates;
  total_sessions: number;
  high_impact: number;
  high_impact_weeks: number;
  total_minutes: number;
  math_minutes: number;
  english_minutes: number;
  science_minutes: number;
  social_studies_minutes: number;
  humanities_minutes: number;
  weeks: Week[];
};

export type Week = {
  highImpact: boolean;
  startDate: string;
  logs: Log[];
};
