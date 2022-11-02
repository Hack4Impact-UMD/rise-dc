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

export {getStudentWithID};