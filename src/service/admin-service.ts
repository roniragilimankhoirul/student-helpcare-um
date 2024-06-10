import { firebaseAdmin } from "../config/firebase";
import { ResponseError } from "../error/response-error";
import { Validation } from "../helper/validation";
import { AdminRepositoryImpl } from "../repository/admin-repository-impl";
import { AdminRequest } from "../type/admin-type";
import { AdminValidation } from "../validation/admin-validation";

export class AdminService {
  static async register(request: AdminRequest) {
    const requestAdmin = Validation.validate(AdminValidation.REGISTER, request);
    let firebaseRecord;
    try {
      firebaseRecord = await firebaseAdmin.auth().createUser({
        email: requestAdmin.email,
        password: requestAdmin.password,
        displayName: requestAdmin.name,
        photoURL: `https://ui-avatars.com/api/?size=128&background=0D8ABC&color=fff&name=${encodeURIComponent(
          requestAdmin.name
        )}`,
      });
      const adminRepositoryImpl = new AdminRepositoryImpl();
      await adminRepositoryImpl.create({
        id: firebaseRecord.uid,
        name: requestAdmin.name,
        id_school: requestAdmin.id_school,
        email: requestAdmin.email,
      });
    } catch (error: any) {
      if (firebaseRecord && firebaseRecord.uid) {
        try {
          await firebaseAdmin.auth().deleteUser(firebaseRecord.uid);
        } catch (firebaseError) {
          console.error(
            "Error deleting Firebase user after PostgreSQL failure:",
            firebaseError
          );
        }
      }

      if (error.code === "auth/email-already-exists") {
        throw new ResponseError(
          409,
          "The email address is already in use by another account."
        );
      }

      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/weak-password"
      ) {
        throw new ResponseError(400, "Invalid email or weak password.");
      }

      console.error("Error registering admin:", error);
      throw new ResponseError(500, "Internal Server Error");
    }
  }
}
