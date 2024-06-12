import { Response, NextFunction } from "express";
import { ComplaintService } from "../service/complaint-service";
import { CreateComplaintRequest } from "../type/complaint-type";
import { UserRequest } from "../type/user-type";
import { AdminRequest } from "../type/admin-type";
export class ComplaintController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const id = req.user as string;
      const request = req.body as CreateComplaintRequest;
      await ComplaintService.create(request, id);
      res.status(200).json({
        message: "Create a complaint successfully",
      });
    } catch (e) {
      next(e);
    }
  }
  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const id = req.user as string;
      const result = await ComplaintService.get(id);
      res.status(200).json({
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }
  static async getById(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const result = await ComplaintService.getById(id);
      res.status(200).json({
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }
  static async getAllBySchool(
    req: AdminRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.admin as string;
      const result = await ComplaintService.getAllBySchool(id);
      res.status(200).json({
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }
}
