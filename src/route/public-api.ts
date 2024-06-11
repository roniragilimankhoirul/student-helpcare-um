import express from "express";
import { AdminController } from "../controller/admin-controller";
import { SchoolController } from "../controller/school-controller";

export const publicRouter = express.Router();
//ADMIN
publicRouter.post("/api/admin", AdminController.register);
publicRouter.post("/api/admin/login", AdminController.login);
//SCHOOL
publicRouter.get("/api/schools", SchoolController.getAll);
publicRouter.get("/api/schools/:id", SchoolController.getById);
// USER
publicRouter.post("/api/users", AdminController.register);
// publicRouter.post("/api/admin/login", AdminController.login);
