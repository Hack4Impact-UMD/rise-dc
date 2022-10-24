import {
  getAuth,
  updateEmail,
  reauthenticateWithCredential,
} from "firebase/auth";
import app from "../src/config/firebase";

/*
Updates the logged-in user's email.
May fail if the login token is old. Currently not handling this case, because
this function should be called with the RequireAdminAuth function 
which should update the token. Another solution is to include a password
field in the frontend for this.

Parameters:
Email: the new email
*/
async function updateUserEmail(fn: (email: string) => void) {
  const auth = getAuth(app);
  const user = auth.currentUser;

  updateEmail(user, email).catch((error) => {
    console.error(error);
  });
}

/*
Updates the logged-in user's password.
Shouldn't face the re-authentication issue because password is provided to re-authenticate within the function.
 */
async function updateUserPassword(
  fn: (newPassword: string, oldPassword: string) => void
) {
  const auth = getAuth(app);
  const user = auth.currentUser;

  reauthenticateWithCredential(user, oldPassword)
    .then(() => {
      updatePassword(user, newPassword).catch((error) => {
        console.error(error);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}
