"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const auth_user_middleware_1 = require("../middleware/auth-user-middleware");
const user_controller_1 = require("../controller/user-controller");
const complaint_controller_1 = require("../controller/complaint-controller");
const admin_controller_1 = require("../controller/admin-controller");
const auth_admin_middleware_1 = require("../middleware/auth-admin-middleware");
exports.router = express_1.default.Router();
//USER
exports.router.get("/api/users/profile", auth_user_middleware_1.authUserMiddleware, user_controller_1.UserController.get);
//COMPLAINT
exports.router.post("/api/complaints", auth_user_middleware_1.authUserMiddleware, complaint_controller_1.ComplaintController.create);
exports.router.get("/api/complaints", auth_user_middleware_1.authUserMiddleware, complaint_controller_1.ComplaintController.get);
exports.router.get("/api/complaints/:id", auth_user_middleware_1.authUserMiddleware, complaint_controller_1.ComplaintController.getById);
// ADMIN
exports.router.get("/api/admin/profile", auth_admin_middleware_1.authAdminMiddleware, admin_controller_1.AdminController.get);
exports.router.get("/api/admin/complaints", auth_admin_middleware_1.authAdminMiddleware, complaint_controller_1.ComplaintController.getAllBySchool);
