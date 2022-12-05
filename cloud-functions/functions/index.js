const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

/*
 * Creates a new user
 *
 * Arguments:
 * email: string
 * role: string (Options: "admin", "user")
 */
exports.createUser = functions.https.onCall(async (data, context) => {
  const auth = admin.auth();

  // Check if current user is authenticated.
  if (context.auth.uid == null) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "failed to authenticate request. ID token is missing or invalid.",
    );
  }

  // Check that current user is an admin.
  auth
      .getUser(context.auth.uid)
      .then((userRecord) => {
        if (userRecord.customClaims["role"] != "admin") {
          throw new functions.https.HttpsError(
              "permission-denied",
              "Permission denied. Only admins can create new users.",
          );
        }
      });

  // Check that arguments exist.
  // TODO: improve data validation
  if (data.email == null || data.role == null) {
    throw new functions.https.HttpsError(
        "invalid-argument",
        "Missing arguments. Request must include email, password, and role.",
    );
  }

  try {
    const userRecord = await auth.createUser(
        {email: data.email, password: "defaultpassword"});
    auth.setCustomUserClaims(userRecord.uid, {role: data.role});
  } catch (error) {
    throw new functions.https.HttpsError("unknown", `${error}`);
  }
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
                "Only an admin user can change roles",
            );
          }
        } else {
          throw new functions.https.HttpsError(
              "invalid-argument",
              "Must provide a uid and role",
          );
        }
      })
      .catch((error) => {
        throw new functions.https.HttpsError(
            "permission-denied",
            "Failed to authenticate: " + error,
        );
      });
});

exports.createFirstAdmin = functions.https.onRequest((req, res) => {
  const auth = admin.auth();
  auth
      .setCustomUserClaims("OSTlNGSgPWhcDya9QnNaD0OJmVr1", {role: "admin"})
      .then( () => {
        auth
            .getUserByEmail("songa@umd.edu")
            .then((userRecord) => {
              const role = userRecord.customClaims["role"];
              res.json({result: `songa@umd.edu role is ${role}`});
            })
            .catch((error) => {
              res.json({result: error});
            });
      })
      .catch((error) => {
        res.json({result: "Operation Failed:" + error});
      });
});

exports.getUserRole = functions.https.onRequest((req, res) => {
  const auth = admin.auth();
  auth
      .getUserByEmail(req.email)
      .then((userRecord) => {
        const role = userRecord.customClaims["role"];
        res.json({result: `role for ${req.email} is ${role}`});
      })
      .catch((error) => {
        res.json({result: error});
      });
});

