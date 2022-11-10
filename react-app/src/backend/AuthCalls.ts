import { getAuth, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
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
export function updateUserEmail(email: string):string {
  const auth = getAuth(app);
  const user = auth.currentUser;
  var status = "Unknown Error Occured";

  if (user != null) {
      updateEmail(user, email)
      .then(() => {
          status = "Changed current account's email from {user.email} to {email}";
      })
      .catch((error) => {
        status = "Recieved error: {error}";
        console.error(error);
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
export function updateUserPassword(newPassword: string, oldPassword: string):string {
  const auth = getAuth(app);
  const user = auth.currentUser;
  var status = "Unknown Error";

  if (user != null) {
      const credential = EmailAuthProvider.credential(user.email!, oldPassword);
      reauthenticateWithCredential(user, credential)
        .then(() => {
          updatePassword(user, newPassword)
          .then(() => {
              console.log("updated password");
              status = "Successfully updated password";
          })
          .catch((error) => {
            console.error(error);
          });
        })
        .catch((error) => {
          console.error(error);
        });
  } else {
      status = "Session expired. Please sign in again.";
  }

  return status;
}

