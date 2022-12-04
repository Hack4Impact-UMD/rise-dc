import { functions } from "../config/firebase";
import { httpsCallable } from "firebase/functions";

export function createUser(newEmail: string, newRole: string) {
    const createUserCloudFunction = httpsCallable(functions, "createUser");
    createUserCloudFunction({email: newEmail, role: newRole})
        .then( () => {
            console.log("success")
        })
        .catch((error) => {
            console.log(error);
        });
}

export default {};
