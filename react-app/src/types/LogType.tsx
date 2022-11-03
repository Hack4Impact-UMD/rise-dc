import { Timestamp } from "firebase/firestore"

export type Log = {
    date: Timestamp,
    duration_minutes: number,
    instructor_name: string,
    reason: string,
    student_id: string,
    subject: string,
    summary: string,
    type: SessionType
}

export type SessionType = "TUTOR" | "MENTOR"