import {doc, collection, query, where, addDoc, getDoc, DocumentData, FirestoreError, DocumentSnapshot, DocumentReference, getDocFromCache, setDoc, getDocs} from "firebase/firestore"
import {db} from "../config/firebase";
import {Student, Grades} from "../types/StudentType"
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
