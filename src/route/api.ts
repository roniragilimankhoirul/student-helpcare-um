import express from "express";
import { authUserMiddleware } from "../middleware/auth-user-middleware";
import { UserController } from "../controller/user-controller";

export const router = express.Router();
router.get("/api/users/profile", authUserMiddleware, UserController.get);
