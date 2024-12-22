import Joi from "joi";
import { Middleware } from "../types/global";
import { NextFunction, Request, Response } from "express";

export const validateBody = (joiSchema: Joi.ObjectSchema): Middleware => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.body) res.json({ error: ["payload not provided"] }).status(400);
      await joiSchema.validateAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        return res
          .status(400)
          .json({ error: error.details.map((error) => error.message) });
      }
    }
  };
};
