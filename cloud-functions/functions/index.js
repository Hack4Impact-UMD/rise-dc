const functions = require("firebase-functions");
const admin = require("firebase-admin");

/*
Takes argument of form {uid: string, role: string}
Sets the role of user with the given uid to the given role
*/
exports.setUserRole = functions.https.onCall((data, context) => {
  const auth = admin.auth();
  // authenticate caller
  auth.verifyIdToken(data.idToken)
    .then((claims) => {
        // check input
        if (data.uid != null && data.role != null) {
          // check that caller is admin
          if (claims.role == "admin")  {
              auth.setCustomUserClaims(data.uid, {role: data.role});
          } else {
              throw new functions.https.HttpsError('permission-denied', "Only an admin user can change roles");
          }
        } else {
            throw new functions.https.HttpsError('invalid-argument', "Must provide a uid and role");
        }
    }).catch((error) => {
        throw new functions.https.HttpsError('permission-denied', "Failed to authenticate: "+error);
    });
});
