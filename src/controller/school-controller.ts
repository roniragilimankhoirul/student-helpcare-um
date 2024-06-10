import { Request, Response, NextFunction } from "express";
import { SchoolService } from "../service/school-service";

export class SchoolController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await SchoolService.getAll();
      res.status(200).json({ data: result });
    } catch (e) {
      next(e);
    }
  }
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.params.id as string;
      const result = await SchoolService.getById(request);
      res.status(200).json({ data: result });
    } catch (e) {
      next(e);
    }
  }
}
