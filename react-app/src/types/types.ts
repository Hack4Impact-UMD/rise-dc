
export type Grades = {
    english_after : string,
    english_before : string,
    humanities_after : string,
    humanities_before : string,
    math_after : string,
    math_before : string,
    science_after : string,
    science_before : string,
    social_studies_after : string,
    social_studies_before : string
}

export type Student = {
    address : string,
    email : string,
    grade_level : string,
    grades : Grades,
    guardian_email : string,
    guardian_name : string,
    guardian_phone: string,
    high_school : string,
    name: string,
    phone_number : string,
    reading_level : string
}

export type Logs = {
    date: Date,
    duration_minutes : BigInteger,
    instructor_name : string,
    reason : string,
    student_id : string,
    subject : string,
    summary : string,
    type : string
}

export type User = {
    firebase_id : string,
    name : string,
    type : string
}