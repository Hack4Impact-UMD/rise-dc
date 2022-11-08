import {collection, addDoc} from "firebase/firestore"
import {db} from "../config/firebase";
import {Student} from "../types/StudentType"

async function storeStudent(
    data : Student
) {
    // add new document with generated id
    await addDoc(collection(db, "Students"), data)
}

export {storeStudent}