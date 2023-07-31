import app from "../config/firebase";
import { functions } from "../config/firebase";
import { httpsCallable } from "firebase/functions";
import { getAuth, sendPasswordResetEmail } from "@firebase/auth";

/*
 * Creates a user and sends a password reset email to that user.
 */
export function createUser(
  newEmail: string,
  newName: string,
  newRole: string
): Promise<string> {
  const createUserCloudFunction = httpsCallable(functions, "createUser");
  const auth = getAuth(app);

  return new Promise((resolve, reject) => {
    createUserCloudFunction({ email: newEmail, name: newName, role: newRole })
      .then(() => {
        sendPasswordResetEmail(auth, newEmail)
          .then(() => {
            resolve("Successfully created user account.");
          })
          .catch(() => {
            reject(
              "Error creating account. Account creation failed midway. Please delete the account and try creating it again."
            );
          });
      })
      .catch((error) => {
        if (
          String(error).includes(
            "The email address is already in use by another account."
          )
        ) {
          reject(
            "Error creating account. That email address is already in use by another account."
          );
        }
        reject("Error creating account. Please try again later");
      });
  });
}

export function deleteUser(email: string): Promise<string> {
  const deleteUserCloudFunction = httpsCallable(functions, "deleteUser");
  const auth = getAuth(app);

  return new Promise((resolve, reject) => {
    deleteUserCloudFunction({ email })
      .then(() => {
        resolve("Successfully deleted user.");
      })
      .catch((error) => {
        console.log(error);
        if (String(error).includes("Error fetching user data.")) {
          reject(
            "Error deleting user. Please make sure the entered email is correct."
          );
        }
        reject("Error deleting user. Please try again later");
      });
  });
}

export function changeUserRole(
  email: string,
  newRole: string
): Promise<string> {
  const changeRoleCloudFunction = httpsCallable(functions, "setUserRole");
  const auth = getAuth(app);

  return new Promise((resolve, reject) => {
    changeRoleCloudFunction({ email, role: newRole })
      .then(() => {
        resolve("Successfully changed the user's role.");
      })
      .catch((error) => {
        if (String(error).includes("Error fetching user data.")) {
          reject(
            "Error changing the user's role. Please make sure the entered email is correct."
          );
        }
        reject("Error changing the user's role. Please try again later");
      });
  });
}

export default {};
