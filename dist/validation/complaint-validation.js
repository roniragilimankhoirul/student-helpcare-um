"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplaintValidation = void 0;
const zod_1 = require("zod");
class ComplaintValidation {
}
exports.ComplaintValidation = ComplaintValidation;
ComplaintValidation.CREATE = zod_1.z.object({
    // id_user: z.string().max(100),
    description: zod_1.z.string().min(1).max(100),
});
ComplaintValidation.GET = zod_1.z.string().max(100);
ComplaintValidation.GETBYID = zod_1.z.string().max(100);
ComplaintValidation.GETALLBYSCHOOL = zod_1.z.string().max(100);
ComplaintValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.string().max(100),
    comment: zod_1.z.string()
});
