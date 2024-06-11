import express, { Request, Response } from "express";
import { errorMiddleware } from "../middleware/error-middleware";
import { publicRouter } from "../route/public-api";
import { router } from "../route/api";
export const app = express();
app.use(express.json());
app.use(publicRouter);
app.use(router);
app.use(errorMiddleware);
