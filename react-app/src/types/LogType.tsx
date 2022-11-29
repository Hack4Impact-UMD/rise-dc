import { Timestamp } from "firebase/firestore"

export type Log = {
    date: Date,
    duration_minutes : number,
    instructor_name : string,
    reason : string,
    creator_id : string,
    subject : Subject,
    summary : string,
    type : string
    student_id : string
}

export type Subject = "ENGLISH" | "MATH" | "SOCIAL STUDIES" | "HUMANITIES" | "SCIENCE"

