import * as admin from "firebase-admin";
import * as serviceAccount from "../../student-helpcare-firebase-adminsdk.json";

export const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});
