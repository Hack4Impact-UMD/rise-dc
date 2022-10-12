import React, {useState} from 'react'
import app from '../config/firebase'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'

const DummyLogin = () => {

    const [loginInfo, setLoginInfo] = useState({email: '', password: ''})
    const auth = getAuth(app);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        signInWithEmailAndPassword(auth, loginInfo.email, loginInfo.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
        
    }    

    return (
        <form onSubmit = {handleSubmit}>
            <input id="usernameInput" placeholder = 'email' type="text" onChange = {(e) => setLoginInfo ({...loginInfo, email: e.target.value})}/>
            <input id="usernameInput" placeholder = 'password' type="text" onChange = {(e) => setLoginInfo ({...loginInfo, password: e.target.value})}/>
            <button type="submit">Submit</button>
        </form>
    )
}

export default DummyLogin;