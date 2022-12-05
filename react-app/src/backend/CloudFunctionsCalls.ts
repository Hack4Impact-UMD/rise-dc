import app from "../config/firebase";
import { functions } from "../config/firebase";
import { httpsCallable } from "firebase/functions";
import { getAuth, sendPasswordResetEmail } from "@firebase/auth";

/*
 * Creates a user and sends a password reset email to that user.
 */
export function createUser(newEmail: string, newName: string, newRole: string) {
    const createUserCloudFunction = httpsCallable(functions, "createUser");
    const auth = getAuth(app);

    createUserCloudFunction({email: newEmail, name: newName, role: newRole})
        .then(() => {
            sendPasswordResetEmail(auth, newEmail);
        })
        .catch((error) => {
            console.log(error);
        });
}

export default {};
