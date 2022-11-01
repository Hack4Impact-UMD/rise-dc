import {doc, collection, getDoc, DocumentData, FirestoreError, DocumentSnapshot, DocumentReference, getDocFromCache, setDoc, getDocs} from "firebase/firestore"
import {db} from "../config/firebase";

async function getStudentWithID(
    id : string
): Promise<DocumentData> {
    const studentRef = doc(db, "Students", id)
    const studentSnap = await getDoc(studentRef)
    if(studentSnap.exists()) {
        return Promise.resolve(studentSnap.data())
    }
    else {
        return Promise.reject(new Error("Student not found"))
    }
}

async function getStudent(
    name : string
): Promise<DocumentData> {

    const querySnapshot = await getDocs(collection(db, "Students"))
    querySnapshot.forEach((doc) => {
        if(doc.data()["name"] == name) {
            return Promise.resolve(doc.data())
        }
    })
    return Promise.reject(new Error('Student not found'))
}

async function getAddress(
    name : string
): Promise<string> {
    const student = await getStudent(name)
    return student["address"]
}

async function getEmail(
    name : string
): Promise<string> {
    const student = await getStudent(name)
    return student["email"]
}

async function getGrade(
    name : string
): Promise<string> {
    const student = await getStudent(name)
    return student["grade"]
}

async function getGradeLevel(
    name : string
): Promise<string> {
    const student = await getStudent(name)
    return student["grade_level"]
}

async function getGuardianEmail(
    name : string
): Promise<string> {
    const student = await getStudent(name)
    return student["guardian_email"]
}

async function getGuardianName(
    name : string
): Promise<string> {
    const student = await getStudent(name)
    return student["guardian_name"]
}

async function getGuardianPhone(
    name : string
): Promise<string> {
    const student = await getStudent(name)
    return student["guardian_phone"]
}

async function getHighSchool(
    name : string
): Promise<string> {
    const student = await getStudent(name)
    return student["high_school"]
}

async function getPhoneNumber(
    name : string
): Promise<string> {
    const student = await getStudent(name)
    return student["phone_number"]
}

async function getReadingLevel(
    name : string
): Promise<string> {
    const student = await getStudent(name)
    return student["reading_level"]
}

export {getStudentWithID, getStudent, getAddress, getEmail, getGrade, getGradeLevel, getGuardianEmail, getGuardianName, getGuardianPhone, getHighSchool, getPhoneNumber, getReadingLevel};