export type StudentID = {
  id: string;
  address: string;
  email: string;
  grade_level: string;
  grades: Grades;
  files: StudentFile[];
  guardian_email: string;
  guardian_name: string;
  guardian_phone: string;
  guardian_address: string;
  high_school: string;
  name: string;
  phone_number: string;
  reading_level: string;
  active: boolean;
};

export type Student = {
  address: string;
  email: string;
  grade_level: string;
  grades: Grades;
  files: StudentFile[];
  guardian_email: string;
  guardian_name: string;
  guardian_phone: string;
  guardian_address: string;
  high_school: string;
  name: string;
  phone_number: string;
  reading_level: string;
  active: boolean;
};

export type StudentFile = {
  name: string;
  path: string;
  downloadURL: string;
};

export type Grades = {
  english_before: string;
  english_after: string;
  humanities_before: string;
  humanities_after: string;
  socialStudies_before: string;
  socialStudies_after: string;
  math_before: string;
  math_after: string;
  science_before: string;
  science_after: string;
};
