import express, { Router, Request, Response, NextFunction } from "express";
import CONFIG from "../config/config";

export const authRouter: Router = express.Router();

authRouter.get("/login", (req: Request, res: Response) => {
  res.send(`<div><a href="${CONFIG.BASE_URL}/google">Sign in with Google</a></div>`);
});
