import { Response, NextFunction } from "express";
import { firebaseAdmin } from "../config/firebase";
import { AdminRequest } from "../type/admin-type";
import { ResponseError } from "../error/response-error";
export const authAdminMiddleware = async (
  req: AdminRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const decoded = await firebaseAdmin.auth().verifyIdToken(token);
      if (!decoded.admin) {
        throw new ResponseError(401, "Not Admin");
      }
      req.admin = decoded.user_id;
      next();
    } catch (err) {
      res.status(401).json({
        errors: "Unauthorized",
      });
    }
  } else {
    res.status(401).json({
      errors: "Unauthorized",
    });
  }
};
