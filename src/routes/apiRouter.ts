import express, { Router } from "express";
import { createLink, getLinkById } from "../controller/apiController";
import { validateBody } from "../middleware/validation";
import { shortenSchema } from "../validation/joiSchemas";

export const apiRouter: Router = express.Router();

apiRouter.get("/shorten/:gid", getLinkById);
apiRouter.post("/shorten", validateBody(shortenSchema), createLink);
