import {collection, addDoc} from "firebase/firestore"
import {db} from "../config/firebase";

async function storeStudent(
    data : {}
) {
    // add new document with generated id
    await addDoc(collection(db, "Students"), data)
}

export {storeStudent}

