export type Logs = {
    date: Date,
    duration_minutes : BigInteger,
    instructor_name : string,
    reason : string,
    subject : string,
    summary : string,
    type : string
}

export type User = {
    firebase_id : string,
    name : string,
    type : string
}