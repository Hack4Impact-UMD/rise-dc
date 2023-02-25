export type Log = {
  date: Date;
  duration_minutes: number;
  instructor_name: string;
  reason: string;
  creator_id: string;
  subject: Subject;
  summary: string;
  type: "MENTOR" | "TUTOR";
  student_id: string;
  id: string;
  start_time: string;
  end_time: string;
  collapse: boolean;
};


export type Subject =
  | "ENGLISH"
  | "MATH"
  | "SOCIAL STUDIES"
  | "HUMANITIES/OTHER"
  | "SCIENCE";
