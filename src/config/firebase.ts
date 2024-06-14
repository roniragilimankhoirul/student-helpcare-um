import * as admin from "firebase-admin";
// import * as serviceAccount from "../../student-helpcare-firebase-adminsdk.json";
import "dotenv/config";

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

export const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});
