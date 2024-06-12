import { Request, Response, NextFunction } from "express";
import { AdminService } from "../service/admin-service";
import {
  AdminLoginRequest,
  AdminCreateRequest,
  AdminRequest,
} from "../type/admin-type";

export class AdminController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      await AdminService.register(req.body as AdminCreateRequest);
      res.status(200).json({ message: "Registration success" });
    } catch (e) {
      next(e);
    }
  }
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AdminService.login(req.body as AdminLoginRequest);
      res.status(200).json({ data: result });
    } catch (e) {
      next(e);
    }
  }
  static async get(req: AdminRequest, res: Response, next: NextFunction) {
    try {
      const request = req.admin as string;
      const result = await AdminService.get(request);
      res.status(200).json({ data: result });
    } catch (e) {
      next(e);
    }
  }
}
