import {doc, collection, addDoc, getDoc, query, where, getDocs} from "firebase/firestore"
import {Student} from "../types/StudentType"
import {db} from "../config/firebase";
import {Log} from "../types/LogType"
import { getAuth } from "firebase/auth";
import { RISEUser } from "../types/UserType";
import { SubjectHours } from "../types/SubjectHoursType"
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

export async function getStudentLogs(student_id : string) : Promise<Array<Log>> {
    const q = query(collection(db, "Logs"), where("student_id", "==", student_id))
    return new Promise((resolve, reject) => {
        getDocs(q).then((querySnapshot) => {
            return resolve(querySnapshot.docs.map((doc) => doc.data() as Log))
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
export function averageSessionLength(logs : Array<Log>) : number {
    let s = 0.0
    logs.forEach((log) => {
        s += log.duration_minutes
    })
    return s/logs.length
}
export function hoursSpent(logs : Array<Log>) : SubjectHours {
    let hrs = {
        english_hours : 0,
        humanities_hours : 0,
        socialStudies_hours : 0,
        math_hours : 0,
        science_hours : 0
    } as SubjectHours
    // adding time as minutes
    logs.forEach((log) => {
        if(log.subject == "ENGLISH") {
            hrs.english_hours += log.duration_minutes
        }
        else if(log.subject == "MATH") {
            hrs.math_hours += log.duration_minutes
        }
        else if(log.subject == "HUMANITIES") {
            hrs.humanities_hours += log.duration_minutes
        }
        else if(log.subject == "SCIENCE") {
            hrs.science_hours += log.duration_minutes
        }
        else {
            hrs.socialStudies_hours += log.duration_minutes
        }
    })
    // hours form
    hrs.english_hours/=60
    hrs.humanities_hours/=60
    hrs.math_hours/=60
    hrs.science_hours/=60
    hrs.socialStudies_hours/=60
    return hrs
}   
