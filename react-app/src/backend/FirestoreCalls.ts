import {doc, collection, getDoc, DocumentData, FirestoreError, DocumentSnapshot, DocumentReference, getDocFromCache, setDoc, getDocs} from "firebase/firestore"
import {db} from "../config/firebase";
import {Student, Grades} from "../types/StudentType"

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

export async function getAllStudents(): 
Promise<Array<Student>> {
    const querySnapshot = await getDocs(collection(db, "Students"))
    return querySnapshot.docs.map(doc => doc.data() as Student)    
}