export type RISEUser = {
  name: string;
  firebase_id: string;
  type: Role;
  id?: string;
};

export type Role = "ADMIN" | "MENTOR" | "TUTOR";
