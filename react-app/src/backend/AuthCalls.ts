import { getAuth, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider, AuthError } from "firebase/auth";
import app from "../config/firebase";
import functions from "../config/firebase";

/*
Updates the logged-in user's email.
May fail if the login token is old. Currently not handling this case, because
this function should be called with the RequireAdminAuth function 
which should update the token. Another solution is to include a password
field in the frontend for this.

TODO: make error messages work

Parameters:
Email: the new email
*/
export async function updateUserEmail(email: string):Promise<String> {
  const auth = getAuth(app);
  const user = auth.currentUser;
  var status = "Unknown Error Occured";

  if (user != null) {
      const currEmail = user.email;
      await updateEmail(user, email)
      .then(() => {
          status = `Changed current account's email from ${currEmail} to ${email}`;
      })
      .catch((error) => {
        const code = (error as AuthError).code;
        if (code === "auth/invalid-email") {
          status = "Invalid email entered"
        } else if (code === "auth/requires-recent-login") {
          status = "Session expired. Please sign in again."
        } else if (code === "auth/email-already-in-use") {
          status = "Email already in use. Please use another one"
        } else {
          status = `Recieved error: ${code}`;
        }
      });

  } else {
      status = "Session expired. Please sign in again.";
  }

  return status;
}

/*
Updates the logged-in user's password.
Shouldn't face the re-authentication issue because password is provided to re-authenticate within the function.

TODO: make error messages change properly.
 */
export async function updateUserPassword(newPassword: string, oldPassword: string):Promise<String> {
  const auth = getAuth(app);
  const user = auth.currentUser;
  var status = "Unknown Error";

  if (user != null) {
      const credential = EmailAuthProvider.credential(user.email!, oldPassword);
      await reauthenticateWithCredential(user, credential)
        .then(async () => {
          await updatePassword(user, newPassword)
          .then(() => {
              status = "Successfully updated password";
          })
          .catch((error) => {
            const code = (error as AuthError).code;
            if (code === "auth/weak-password") {
              status = "New password should be at least 6 characters"
            } else {
              status = `Recieved error: ${code}`;
              console.error(code);
            }
          });
        })
        .catch((error) => {
          const code = (error as AuthError).code;
          if (code === "auth/wrong-password") {
            status = "Incorrect Password"
          } else if (code === "auth/too-many-request") {
            status = "Access to this account has been temporarily disabled due to many failed \
                      login attempts or due to too many failed password resets. Please try again later"
          } else {
            status = `Recieved error: ${code}`;
            console.error(code);
          }
        });
  } else {
      status = "Session expired. Please sign in again.";
  }

  return status;
}

