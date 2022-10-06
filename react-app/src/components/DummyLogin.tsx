import React, {useState} from 'react'
//import app from '../config/firebase'
import { useNavigate } from 'react-router-dom';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const DummyLogin = () => {
    const navigate = useNavigate();
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
    const auth = getAuth();
    const user = auth.currentUser
    // if (user) {
    //     navigate("../landing")
    // }

    const [loginInfo, setLoginInfo] = useState({email: '', password: ''})
    const [error, setError] = useState<Boolean | null>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        signInWithEmailAndPassword(auth, loginInfo.email, loginInfo.password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate("../landing")
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(true)
            });
        
    }    

    return (
        <form onSubmit = {handleSubmit}>
            <input id="usernameInput" placeholder = 'email' type="text" onChange = {(e) => setLoginInfo ({...loginInfo, email: e.target.value})}/>
            <input id="usernameInput" placeholder = 'password' type="text" onChange = {(e) => setLoginInfo ({...loginInfo, password: e.target.value})}/>
            <button type="submit">Submit</button>
            {error ? 
                <div>
                    <br/>
                    "Incorrect Username or Password"
                </div> 
                : <div></div>
            }
        </form>
    )
}

export default DummyLogin;