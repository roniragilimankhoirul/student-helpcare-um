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
exports.authAdminMiddleware = void 0;
const firebase_1 = require("../config/firebase");
const response_error_1 = require("../error/response-error");
const authAdminMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (token) {
        try {
            const decoded = yield firebase_1.firebaseAdmin.auth().verifyIdToken(token);
            if (!decoded.admin) {
                throw new response_error_1.ResponseError(401, "Not Admin");
            }
            req.admin = decoded.user_id;
            next();
        }
        catch (err) {
            res.status(401).json({
                errors: "Unauthorized",
            });
        }
    }
    else {
        res.status(401).json({
            errors: "Unauthorized",
        });
    }
});
exports.authAdminMiddleware = authAdminMiddleware;
