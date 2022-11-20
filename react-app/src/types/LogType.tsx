export type Log = {
    date: Date,
    duration_minutes : number,
    instructor_name : string,
    reason : string,
    student_id : string,
    creator_id : string,
    subject : Subject,
    summary : string,
    type : string
}

export type Subject = "ENGLISH" | "MATH" | "SOCIAL STUDIES" | "HUMANITIES" | "SCIENCE"