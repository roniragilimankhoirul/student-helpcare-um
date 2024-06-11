import { Request, Response, NextFunction } from "express";
import { UserService } from "../service/user-service";
import { UserCreateRequest } from "../type/user-type";
// import { UserSevice } from "../service/user-service";
// import { UserService } from "../service/user-service";
// import { UserLoginRequest, AdminRequest } from "../type/admin-type";

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      await UserService.register(req.body as UserCreateRequest);
      res.status(200).json({ message: "Registration success" });
    } catch (e) {
      next(e);
    }
  }
}
