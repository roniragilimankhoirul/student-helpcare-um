import { Request, Response, NextFunction } from "express";
import { UserService } from "../service/user-service";
import { UserCreateRequest, UserLoginRequest } from "../type/user-type";

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      await UserService.register(req.body as UserCreateRequest);
      res.status(200).json({ message: "Registration success" });
    } catch (e) {
      next(e);
    }
  }
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await UserService.login(req.body as UserLoginRequest);
      res.status(200).json({ data: result });
    } catch (e) {
      next(e);
    }
  }
}
