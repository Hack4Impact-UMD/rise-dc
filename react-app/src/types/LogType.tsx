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
};

export type Subject =
  | "ENGLISH"
  | "MATH"
  | "SOCIAL STUDIES"
  | "HUMANITIES"
  | "SCIENCE"
  | "OTHER";
