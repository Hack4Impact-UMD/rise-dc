import {doc, collection, addDoc, getDoc, DocumentData, FirestoreError, DocumentSnapshot, DocumentReference, getDocFromCache, setDoc, getDocs} from "firebase/firestore"
import {db} from "../config/firebase";
import {Student, Grades} from "../types/StudentType"

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

export function getAllStudents(): 
Promise<Array<Student>> {
    return new Promise((resolve, reject) => {
        getDocs(collection(db, "Students")).then((snap) => {
            const students = snap.docs.map(doc =>
                {
                    let student : Student = doc.data() as Student
                    student.id = doc.id
                    return student
                })
            return resolve(students);
        }).catch((e) => {
            reject(e);
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

