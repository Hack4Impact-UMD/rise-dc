import {doc, collection, addDoc, getDoc, query, where, getDocs} from "firebase/firestore"
import {db} from "../config/firebase";
import {Student} from "../types/StudentType"
import {Logs} from "../types/types"

export function getStudentWithID(
    id : string
): Promise<Student> {
    return new Promise((resolve, reject) => {
    const studentRef = doc(db, "Students", id)
    getDoc(studentRef).then((studentSnap) => {
        if(studentSnap.exists()) {
            return resolve((studentSnap.data() as Student))
        }
        else {
            return reject(new Error("Student not found"))
        }
    }).catch((e) => {
        return reject(e);
    })
    })
}

export function storeStudent(student: Student): Promise<void> {
    return new Promise((resolve, reject) => {
        addDoc(collection(db, "Students"), student).then(() => {
            return resolve();
        }).catch((e) => {
            return reject(e);
        })
    })
} 

export async function getStudentLogs(student_id : string) : Promise<Array<Logs>> {
    const q = query(collection(db, "Logs"), where("student_id", "==", student_id))
    return new Promise((resolve, reject) => {
        getDocs(q).then((querySnapshot) => {
            return resolve(querySnapshot.docs.map((doc) => doc.data() as Logs))
        }
        ).catch((e) => {
            return reject(e)
        })
    })
}