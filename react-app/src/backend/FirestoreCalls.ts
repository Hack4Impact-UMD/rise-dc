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

export async function getAllStudents(): 
Promise<Array<Student>> {
    const querySnapshot = await getDocs(collection(db, "Students"))
    return querySnapshot.docs.map(doc =>
        {
            let student : Student = doc.data() as Student
            student.id = doc.id
            return student
        })    
}