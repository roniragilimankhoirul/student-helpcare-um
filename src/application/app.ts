import express, { Request, Response } from "express";
import { errorMiddleware } from "../middleware/error-middleware";
import { publicRouter } from "../route/public-api";
export const app = express();
app.use(express.json());
app.use(publicRouter);
app.use(errorMiddleware);
