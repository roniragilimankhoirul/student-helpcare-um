import { Response, NextFunction } from "express";
import { firebaseAdmin } from "../config/firebase";
import { UserRequest } from "../type/user-type";
export const authUserMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const decoded = await firebaseAdmin.auth().verifyIdToken(token);
      req.user = decoded.user_id;
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
