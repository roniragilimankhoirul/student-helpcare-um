import express from "express";
import { authUserMiddleware } from "../middleware/auth-user-middleware";
import { UserController } from "../controller/user-controller";
import { ComplaintController } from "../controller/complaint-controller";
import { AdminController } from "../controller/admin-controller";
import { authAdminMiddleware } from "../middleware/auth-admin-middleware";

export const router = express.Router();
//USER
router.get("/api/users/profile", authUserMiddleware, UserController.get);
//COMPLAINT
router.post("/api/complaints", authUserMiddleware, ComplaintController.create);
router.get("/api/complaints", authUserMiddleware, ComplaintController.get);
router.get(
  "/api/complaints/:id",
  authUserMiddleware,
  ComplaintController.getById
);
// ADMIN
router.get("/api/admin/profile", authAdminMiddleware, AdminController.get);
router.get(
  "/api/admin/complaints",
  authAdminMiddleware,
  ComplaintController.getAllBySchool
);
router.put(
    "/api/admin/complaints/:id",
    authAdminMiddleware,
    ComplaintController.update
);
