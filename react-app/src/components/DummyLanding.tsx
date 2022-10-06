import React, {useState} from 'react'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
const DummyLanding = () => {

    const [role, setRole] = useState<String | null>(null);
    const firebaseConfig = {
        apiKey: "AIzaSyAy9GLcZ03dfe31fGK2vxmmCgFno8X3Hpg",
        authDomain: "rise-dc-fd5a6.firebaseapp.com",
        projectId: "rise-dc-fd5a6",
        storageBucket: "rise-dc-fd5a6.appspot.com",
        messagingSenderId: "650118133496",
        appId: "1:650118133496:web:e3dca21534a8947100ad0d",
        measurementId: "G-CRHN8KVGQK"
    };
    const app = initializeApp(firebaseConfig);
    const auth = getAuth()
    const user = auth.currentUser
    if (user) {
        user.getIdTokenResult()
        .then((idTokenResult) => {
            if (!!idTokenResult.claims.admin) {
                setRole("Admin")
            } else {
                setRole("User")
            }
        })
        .catch((error: any) => {
            console.log(error);
        })
    }

    return (
            <div>
                {user ? role : "You cannot access this page."}
            </div>
    )
}

export default DummyLanding;