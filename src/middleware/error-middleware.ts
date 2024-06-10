import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../error/response-error";

export const errorMiddleware = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    const formattedErrors: { [key: string]: string } = {};
    error.errors.forEach((err) => {
      if (err.path) {
        formattedErrors[err.path.join(".")] = err.message;
      }
    });
    res.status(400).json({
      errors: formattedErrors,
    });
  } else if (error instanceof ResponseError) {
    res.status(error.status).json({
      errors: error.message,
    });
  } else {
    res.status(500).json({ error: error.message });
  }
};
