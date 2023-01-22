import { Log } from "../../types/LogType";

export type Dates = {
  startDate: Date;
  endDate: Date;
};

export type SessionInformation = {
  dateRange: Dates;
  total_sessions: number;
  high_impact: number;
  mentor: {
    names: String[];
    time: number;
  };
  students: Map<string, Log[]>;
  high_impact_students: String[];
  low_impact_students: String[];
  tutor: {
    names: String[];
    time: number;
  };
  math_minutes: number;
  english_minutes: number;
  science_minutes: number;
  social_studies_minutes: number;
  humanities_minutes: number;
};
