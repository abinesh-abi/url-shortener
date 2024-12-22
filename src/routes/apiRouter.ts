import express, { Router, Request, Response, NextFunction } from "express";
import CONFIG from "../config/config";

export const apiRouter: Router = express.Router();

apiRouter.post("/shorten", (req: Request, res: Response) => {
  res.json(({'msg':'test'}))
});
