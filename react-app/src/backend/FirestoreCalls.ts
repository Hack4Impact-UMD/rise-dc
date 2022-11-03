import {doc, collection, addDoc, getDoc, DocumentData, FirestoreError, DocumentSnapshot, DocumentReference, getDocFromCache, setDoc, getDocs} from "firebase/firestore"
import { resolve } from "path";
import {db} from "../config/firebase";
import Students from "../landing-page-components/Students/Students";
import {Student, Grades} from "../types/StudentType"
import { Log } from "../types/LogType";

export function getStudentWithID(
    id : string
): Promise<Student> {
    return new Promise((resolve, reject) => {
    const studentRef = doc(db, "Students", id)
    getDoc(studentRef).then((studentSnap) => {
        if(studentSnap.exists()) {
            let student = studentSnap.data()
            student.id = id
            return resolve((student as Student))
        }
        else {
            return reject(new Error("Student not found"))
        }
    }).catch((e) => {
        return reject(e);
    })
    })
}

export function addStudent(student : Student) : Promise<void> {
    return new Promise((resolve, reject) => {
        addDoc(collection(db, "Students"), student).then(() => {
            return resolve();
        }).catch(() => {
            return reject();
        })
    })
}

export function addLog(log : Log) : Promise<void> {
    return new Promise((resolve, reject) => {
        addDoc(collection(db, "Logs"), log).then(() => {
            return resolve();
        }).catch(() => {
            return reject();
        })
    })
}
