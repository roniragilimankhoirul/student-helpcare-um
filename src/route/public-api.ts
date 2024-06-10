import express from "express";
import { AdminController } from "../controller/admin-controller";

export const publicRouter = express.Router();
publicRouter.post("/api/admin", AdminController.register);
