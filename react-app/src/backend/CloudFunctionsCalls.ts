import { functions } from "../config/firebase";
import { httpsCallable } from "firebase/functions";

export function createUser(newEmail: string, newRole: string) {
    const createUserCloudFunction = httpsCallable(functions, "createUser");
    createUserCloudFunction({email: newEmail, role: newRole})
        .catch((error) => {
            console.log(error);
        });
}

export function deleteUser(userUid: string) {
    const deleteUserCloudFunction = httpsCallable(functions, "deleteUser");
    deleteUserCloudFunction({uid: userUid})
        .catch((error) => {
            console.log(error);
        });
}

export default {};
