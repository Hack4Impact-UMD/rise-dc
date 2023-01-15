import { AuthError, User } from "@firebase/auth";
import { signInWithEmailAndPassword, getAuth, signOut, sendPasswordResetEmail} from "firebase/auth";
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

export function logOut() : Promise<void> {
    return new Promise((resolve, reject) => {
        const auth = getAuth(app);
        signOut(auth).then(() => {
            resolve();
        }).catch((error) => {
            reject(error);
        })
    })
}

export function sendResetEmail(email: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const auth = getAuth(app);
      sendPasswordResetEmail(auth, email).then(() => {
          resolve();
      }).catch((error) => {
          reject(error);
      })
    })
}