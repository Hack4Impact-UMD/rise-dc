export type RISEUser = {
  name: string;
  firebase_id: string;
  type: Role;
  email: string;
  id?: string;
};

export type Role = "ADMIN" | "MENTOR" | "TUTOR";
