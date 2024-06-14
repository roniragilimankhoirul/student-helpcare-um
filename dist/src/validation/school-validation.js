"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidation = void 0;
const zod_1 = require("zod");
class AdminValidation {
}
exports.AdminValidation = AdminValidation;
AdminValidation.FINDBYID = zod_1.z.string().max(100);
