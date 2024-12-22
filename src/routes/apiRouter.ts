import express, { Router } from "express";
import { createLink } from "../controller/apiController";

export const apiRouter: Router = express.Router();

apiRouter.post("/shorten",createLink);
