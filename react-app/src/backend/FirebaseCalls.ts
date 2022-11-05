import { AuthError, User } from "@firebase/auth";
import { signInWithEmailAndPassword, getAuth, updateEmail, updatePassword, sendPasswordResetEmail} from "firebase/auth";
import app from '../config/firebase'

export function authenticateUser(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      const auth = getAuth(app);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          resolve(userCredential.user);
        })
        .catch((error: AuthError) => {
          reject(error);
        });
    });
  }