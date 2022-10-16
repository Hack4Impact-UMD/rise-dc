import React, {useState, useEffect} from 'react'
import app from '../config/firebase'
import {getAuth, signInWithEmailAndPassword, AuthError} from 'firebase/auth'
import { useAuth } from "../auth/AuthProvider";
import { useNavigate } from 'react-router-dom';

const DummyLogin: React.FC<any> = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const navigate = useNavigate();
    const auth = useAuth();
    const firebaseAuth = getAuth(app);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        await signInWithEmailAndPassword(firebaseAuth, email, password)
            .then( async (userCredential: any) => {
                if (userCredential != null) {
                    let token = await userCredential.user.getIdTokenResult();
                    navigate("../landing")
                } else {
                    setErrorMessage("User not found")
                }
            })
            .catch((error) => {
                let code = (error as AuthError).code;
                if (code === "auth/user-not-found") {
                  setErrorMessage("Account does not exist");
                } else if (code === "auth/wrong-password") {
                  setErrorMessage("Incorrect Password");
                } else if (code === "auth/too-many-requests") {
                  setErrorMessage(
                    "Access to this account has been temporarily disabled due to many failed login attempts. You can reset your password or try again later."
                  );
                } else {
                  setErrorMessage("Make sure your email is correct. If that does not work, please try again later.");
                }
            });
        
    }    
    useEffect(() => {
      firebaseAuth.signOut();
    }, []);

    return (
        <div>
            <form onSubmit = {handleSubmit}>
                <input id="usernameInput" placeholder = 'email' type="text" onChange = {(e) => setEmail (e.target.value)}/>
                <input id="usernameInput" placeholder = 'password' type="text" onChange = {(e) => setPassword (e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
            {errorMessage}
        </div>

    )
}

export default DummyLogin;