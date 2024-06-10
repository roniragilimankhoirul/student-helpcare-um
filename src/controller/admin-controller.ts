import { Request, Response, NextFunction } from "express";
import { AdminService } from "../service/admin-service";
import { AdminRequest } from "../type/admin-type";

export class AdminController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      await AdminService.register(req.body as AdminRequest);
      res.json({ message: "Registration success" });
    } catch (e) {
      next(e);
    }
  }
}
