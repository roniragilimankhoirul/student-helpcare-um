import express from "express";
import { authUserMiddleware } from "../middleware/auth-user-middleware";
import { UserController } from "../controller/user-controller";
import { ComplaintController } from "../controller/complaint-controller";

export const router = express.Router();
//USER
router.get("/api/users/profile", authUserMiddleware, UserController.get);
//COMPLAINT
router.post("/api/complaints", authUserMiddleware, ComplaintController.create);
