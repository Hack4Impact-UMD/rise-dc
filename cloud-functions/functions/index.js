const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

/*
 * Creates a new user
 *
 * Arguments:
 * email: string
 * password: string
 * role: string (Options: "admin", "user")
 */
exports.createUser = functions.https.onCall((data, context) => {
  const auth = admin.auth();

  // Check if current user is authenticated.
  if (context.auth.uid == null) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "failed to authenticate request. ID token is missing or invalid."
    );
  }

  // Check that current user is an admin.
  auth
      .getUser(context.auth.uid)
      .then((userRecord) => {
        if (userRecord.customClaims["role"] != "admin") {
          throw new functions.https.HttpsError(
              "permission-denied",
              "Permission denied. Only admins can create new users."
          );
        }
      });

  // Check that arguments exist.
  // TODO: improve data validation
  if (data.email == null || data.password == null || data.role == null) {
    throw new functions.https.HttpsError(
        "invalid-argument",
        "Missing arguments. Request must include email, password, and role."
    );
  }

  auth
      .createUser({
        email: data.email,
        password: data.password,
      })
      .then((userRecord) => {
        auth.setCustomUserClaims(userRecord.uid, {role: data.role});
      });
});

/*
Takes argument of form {uid: string, role: string}
Sets the role of user with the given uid to the given role
*/
exports.setUserRole = functions.https.onCall((data, context) => {
  const auth = admin.auth();
  // authenticate caller
  auth
      .verifyIdToken(data.idToken)
      .then((claims) => {
      // check input
        if (data.uid != null && data.role != null) {
        // check that caller is admin
          if (claims.role == "admin") {
            auth.setCustomUserClaims(data.uid, {role: data.role});
          } else {
            throw new functions.https.HttpsError(
                "permission-denied",
                "Only an admin user can change roles"
            );
          }
        } else {
          throw new functions.https.HttpsError(
              "invalid-argument",
              "Must provide a uid and role"
          );
        }
      })
      .catch((error) => {
        throw new functions.https.HttpsError(
            "permission-denied",
            "Failed to authenticate: " + error
        );
      });
});