"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
class UserValidation {
}
exports.UserValidation = UserValidation;
UserValidation.REGISTER = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100),
    email: zod_1.z.string().email().max(100),
    password: zod_1.z.string().min(6).max(100),
    id_school: zod_1.z.string().max(100),
});
UserValidation.LOGIN = zod_1.z.object({
    email: zod_1.z.string().email().max(100),
    password: zod_1.z.string().min(6).max(100),
});
