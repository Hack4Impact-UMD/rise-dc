export type LogID = {
  log: Log;
  id: string;
};

export type Log = {
  date: string;
  duration_minutes: number;
  instructor_name: string;
  reason: string;
  creator_id: string;
  subject: Subject;
  summary: string;
  type: "MENTOR" | "TUTOR";
  student_id: string;
  start_time: string;
  end_time: string;
};

export type Subject =
  | "ENGLISH"
  | "MATH"
  | "SOCIAL STUDIES"
  | "HUMANITIES/OTHER"
  | "SCIENCE";
