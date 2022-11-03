import {doc, collection, query, where, getDoc, DocumentData, FirestoreError, DocumentSnapshot, DocumentReference, getDocFromCache, setDoc, getDocs} from "firebase/firestore"
import {db} from "../config/firebase";
import { getAuth } from "firebase/auth";
import {Student, Grades} from "../types/StudentType";
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