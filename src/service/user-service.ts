import { firebaseAdmin } from "../config/firebase";
import { ResponseError } from "../error/response-error";
import { Validation } from "../helper/validation";
import { UserRepositoryImpl } from "../repository/user-repository-impl";
import { UserCreateRequest, UserLoginRequest } from "../type/user-type";
import { UserValidation } from "../validation/user-validation";
export class UserService {
  static async register(request: UserCreateRequest): Promise<void> {
    const requestUser = Validation.validate(UserValidation.REGISTER, request);
    let firebaseRecord;
    try {
      firebaseRecord = await firebaseAdmin.auth().createUser({
        email: requestUser.email,
        password: requestUser.password,
        displayName: requestUser.name,
        photoURL: `https://ui-avatars.com/api/?size=128&background=0D8ABC&color=fff&name=${encodeURIComponent(
          requestUser.name
        )}`,
      });
      const userRepositoryImpl = new UserRepositoryImpl();
      await userRepositoryImpl.create({
        id: firebaseRecord.uid,
        name: requestUser.name,
        id_school: requestUser.id_school,
        email: requestUser.email,
        photo_url: firebaseRecord.photoURL!,
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
  static async login(request: UserLoginRequest) {
    const requestUser = Validation.validate(UserValidation.LOGIN, request);
    try {
      const apiKey = process.env.API_KEY;
      const response = await fetch(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: requestUser.email,
            password: requestUser.password,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to login: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.idToken) {
        throw new Error("ID token not found in response");
      }

      return { token: data.idToken };
    } catch (error: any) {
      console.error("Error logging in:", error.message);
      throw new Error("Login failed");
    }
  }
}
