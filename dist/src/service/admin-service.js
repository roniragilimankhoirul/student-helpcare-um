"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const firebase_1 = require("../config/firebase");
const response_error_1 = require("../error/response-error");
const validation_1 = require("../helper/validation");
const admin_repository_impl_1 = require("../repository/admin-repository-impl");
const admin_validation_1 = require("../validation/admin-validation");
require("dotenv/config");
class AdminService {
    static register(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestAdmin = validation_1.Validation.validate(admin_validation_1.AdminValidation.REGISTER, request);
            let firebaseRecord;
            try {
                firebaseRecord = yield firebase_1.firebaseAdmin.auth().createUser({
                    email: requestAdmin.email,
                    password: requestAdmin.password,
                    displayName: requestAdmin.name,
                    photoURL: `https://ui-avatars.com/api/?size=128&background=0D8ABC&color=fff&name=${encodeURIComponent(requestAdmin.name)}`,
                });
                yield firebase_1.firebaseAdmin
                    .auth()
                    .setCustomUserClaims(firebaseRecord.uid, { admin: true });
                const adminRepositoryImpl = new admin_repository_impl_1.AdminRepositoryImpl();
                yield adminRepositoryImpl.create({
                    id: firebaseRecord.uid,
                    name: requestAdmin.name,
                    id_school: requestAdmin.id_school,
                    email: requestAdmin.email,
                });
            }
            catch (error) {
                if (firebaseRecord && firebaseRecord.uid) {
                    try {
                        yield firebase_1.firebaseAdmin.auth().deleteUser(firebaseRecord.uid);
                    }
                    catch (firebaseError) {
                        console.error("Error deleting Firebase user after PostgreSQL failure:", firebaseError);
                    }
                }
                if (error.code === "auth/email-already-exists") {
                    throw new response_error_1.ResponseError(409, "The email address is already in use by another account.");
                }
                if (error.code === "auth/invalid-email" ||
                    error.code === "auth/weak-password") {
                    throw new response_error_1.ResponseError(400, "Invalid email or weak password.");
                }
                console.error("Error registering admin:", error);
                throw new response_error_1.ResponseError(500, "Internal Server Error");
            }
        });
    }
    static login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestAdmin = validation_1.Validation.validate(admin_validation_1.AdminValidation.LOGIN, request);
            try {
                const apiKey = process.env.API_KEY;
                const response = yield fetch(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: requestAdmin.email,
                        password: requestAdmin.password,
                        returnSecureToken: true,
                    }),
                });
                if (!response.ok) {
                    throw new Error(`Failed to login: ${response.statusText}`);
                }
                const data = yield response.json();
                if (!data.idToken) {
                    throw new Error("ID token not found in response");
                }
                return { token: data.idToken };
            }
            catch (error) {
                console.error("Error logging in:", error.message);
                throw new Error("Login failed");
            }
        });
    }
    static get(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const adminRepositoryImpl = new admin_repository_impl_1.AdminRepositoryImpl();
            try {
                return adminRepositoryImpl.findById(request);
            }
            catch (error) {
                console.error("Error fetching schools:", error);
                throw new response_error_1.ResponseError(500, "Internal Server Error");
            }
        });
    }
}
exports.AdminService = AdminService;
