const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

/*
 * Creates a new user
 *
 * Arguments:
 * email: string
 * name: string
 * role: string (Options: "admin", "user")
 */
exports.createUser = functions.https.onCall(async (data, context) => {
  const auth = admin.auth();

  // Check if current user is authenticated.
  if (context.auth.uid == null) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "failed to authenticate request. ID token is missing or invalid."
    );
  }

  // Check that current user is an admin.
  auth.getUser(context.auth.uid).then((userRecord) => {
    if (userRecord.customClaims["role"].toUpperCase() != "ADMIN") {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Permission denied. Only admins can create new users."
      );
    }
  });

  // Check that arguments exist.
  // TODO: improve data validation
  if (data.email == null || data.role == null || data.name == null) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Missing arguments. Request must include email, name, and role."
    );
  }

  try {
    const userRecord = await auth.createUser({
      email: data.email,
      password: "defaultpassword",
    });

    await auth.setCustomUserClaims(userRecord.uid, {
      role: data.role.toUpperCase(),
    });
    await db.collection("Users").add({
      firebase_id: userRecord.uid,
      name: data.name,
      type: data.role.toUpperCase(),
      email: data.email,
    });
    return;
  } catch (error) {
    throw new functions.https.HttpsError("unknown", `${error}`);
  }
});

/*
 * Deletes the given user
 *
 * Arguments:
 * uid: string
 */
exports.deleteUser = functions.https.onCall(async (data, context) => {
  const auth = admin.auth();

  // Check if current user is authenticated.
  if (context.auth.uid == null) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "failed to authenticate request. ID token is missing or invalid."
    );
  }

  // Check that current user is an admin.
  const userRecord = await auth.getUser(context.auth.uid);
  if (userRecord.customClaims["role"].toUpperCase() != "ADMIN") {
    throw new functions.https.HttpsError(
      "permission-denied",
      "Permission denied. Only admins can delete users."
    );
  }

  try {
    await auth
      .getUserByEmail(data.email)
      .then(async (userRecord) => {
        await auth.deleteUser(userRecord.uid).catch((error) => {
          throw new functions.https.HttpsError("unknown", `${error}`);
        });

        await db
          .collection("Users")
          .where("email", "==", data.email)
          .get()
          .then(async (querySnapshot) => {
            await Promise.all(
              querySnapshot.docs.map(async (documentSnapshot) => {
                await documentSnapshot.ref.delete();
              })
            )
              .then(() => {
                return;
              })
              .catch(() => {
                throw new functions.https.HttpsError(
                  "unknown",
                  "Deletion failed midway. Please manually delete the user from the firestore database."
                );
              });
          })
          .catch((error) => {
            throw new functions.https.HttpsError("unknown", `${error}`);
          });
        return;
      })
      .catch((error) => {
        throw new functions.https.HttpsError(
          "unknown",
          "Error fetching user data."
        );
      });
  } catch (error) {
    functions.logger.error(error);
    throw new functions.https.HttpsError("unknown", `${error}`);
  }
});

/*
Takes argument of form {uid: string, role: string}
Sets the role of user with the given uid to the given role
*/
exports.setUserRole = functions.https.onCall(async (data, context) => {
  const auth = admin.auth();
  // Check if current user is authenticated.
  if (context.auth.uid == null) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "failed to authenticate request. ID token is missing or invalid."
    );
  }
  // Check that current user is an admin.
  const userRecord = await auth.getUser(context.auth.uid);
  if (userRecord.customClaims["role"].toUpperCase() != "ADMIN") {
    throw new functions.https.HttpsError(
      "permission-denied",
      "Permission denied. Only admins can change user roles."
    );
  }
  // Check that arguments exist.
  // TODO: improve data validation
  if (data.email == null || data.role == null) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Missing arguments. Request must include uid and role."
    );
  }
  try {
    await auth
      .getUserByEmail(data.email)
      .then(async (userRecord) => {
        await auth
          .setCustomUserClaims(userRecord.uid, {
            role: data.role.toUpperCase(),
          })
          .catch((error) => {
            throw new functions.https.HttpsError("unknown", `${error}`);
          });
        await db
          .collection("Users")
          .where("email", "==", data.email)
          .get()
          .then(async (querySnapshot) => {
            await Promise.all(
              querySnapshot.docs.map(async (documentSnapshot) => {
                await documentSnapshot.ref.update({
                  type: data.role.toUpperCase(),
                });
              })
            );
          })
          .catch((error) => {
            throw new functions.https.HttpsError("unknown", `${error}`);
          });
        return;
      })
      .catch((error) => {
        throw new functions.https.HttpsError(
          "unknown",
          "Error fetching user data."
        );
      });
  } catch (error) {
    throw new functions.https.HttpsError("unknown", `${error}`);
  }
});
