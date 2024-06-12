import { Response, NextFunction } from "express";
import { ComplaintService } from "../service/complaint-service";
import { CreateComplaintRequest } from "../type/complaint-type";
import { UserRequest } from "../type/user-type";
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
}
