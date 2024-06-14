"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRouter = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controller/admin-controller");
const school_controller_1 = require("../controller/school-controller");
const user_controller_1 = require("../controller/user-controller");
exports.publicRouter = express_1.default.Router();
//ADMIN
exports.publicRouter.post("/api/admin", admin_controller_1.AdminController.register);
exports.publicRouter.post("/api/admin/login", admin_controller_1.AdminController.login);
//SCHOOL
exports.publicRouter.get("/api/schools", school_controller_1.SchoolController.getAll);
exports.publicRouter.get("/api/schools/:id", school_controller_1.SchoolController.getById);
// USER
exports.publicRouter.post("/api/users", user_controller_1.UserController.register);
exports.publicRouter.post("/api/users/login", user_controller_1.UserController.login);
//HOME
exports.publicRouter.get("/", (req, res) => {
    res.json({ message: "Hello Mom" });
});
