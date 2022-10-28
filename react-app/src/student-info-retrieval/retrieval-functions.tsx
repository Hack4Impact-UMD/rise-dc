import { AuthError, User } from "@firebase/auth";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth, updateEmail, updatePassword, sendPasswordResetEmail} from "firebase/auth";
import {doc, collection, getDoc, getDocs, arrayUnion, DocumentData, FirestoreError, DocumentSnapshot, QuerySnapshot, setDoc, updateDoc, deleteDoc, query, where, orderBy, limit} from "firebase/firestore"

import app, {db, storage } from "../config/firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { getFunctions, httpsCallable } from "firebase/functions";
import { resolve } from "dns";
import { rejects } from "assert";

function getStudent(
    name : string
): Promise<DocumentSnapshot<DocumentData>> {
    
    return new Promise((resolve, rejects) => {
        getDoc(doc(db, "Students", name))
        .then((snap) => {
            resolve(snap);
        }).catch((error) => {
            rejects(error);
        });
    });

}

async function getAddress(
    name : string
): Promise<string> {
    
    const student = await getStudent(name);
    console.log(student);
    return ""
}

getAddress("Fake Name")
export default getStudent;