import {doc, collection, addDoc, getDoc, query, where, getDocs} from "firebase/firestore"
import {Student} from "../types/StudentType"
import {Logs} from "../types/types"
import {db} from "../config/firebase";
import {Log} from "../types/LogType"
import { getAuth } from "firebase/auth";
import { RISEUser } from "../types/UserType";
import app from '../config/firebase'

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

export function getAllStudents() :
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
    
export function getCurrentUser(): Promise<RISEUser> {
    return new Promise((resolve, reject) => {
      const user = getAuth(app).currentUser;
      const usersRef = collection(db, "Users", )
      if (user) {
        getDocs(query(usersRef, where("firebase_id", "==", user.uid))).then((docs) => {
            docs.forEach((doc) => {
                return resolve(doc.data() as RISEUser);
            });
        }).catch((e) => {
            return reject(e);
        })
      } else {
        return reject(new Error("Error retrieving user"));
      }
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

export function storeLog(log: Log): Promise<void> {
    return new Promise((resolve, reject) => {
        addDoc(collection(db, "Logs"), log).then(
        () => {
            return Promise.resolve()})
            .catch((e) => {
                return Promise.reject(e)
        })
    });
}

export function getRecentLogs(): Promise<Array<Log>> {
    return new Promise((resolve, reject) => {
        getDocs(collection(db, "Logs")).then((snap) => {
            const docs = snap.docs;
            docs.sort((a, b) => (a.data().date > b.data().date) ? 1 : -1);
            const logs: Log[] = [];
            const length = Math.min(5, docs.length);
            for (let i = 0; i < length; i++) {
                logs.push(docs[i].data() as Log);
            }
            return resolve(logs);
        }).catch((e) => {
            reject(e);
        })
    })  
}
