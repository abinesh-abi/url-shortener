import jwt from "jsonwebtoken";
import { Request, response } from "express";
import CONFIG from "../config/config";
import { Middleware } from "../types/global";

export const jwtAuth: Middleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.json({ msg: "Authorization token is missing" }).status(401);
  }
  if (token?.startsWith("Bearer ") == false) {
    return res
      .json({ msg: "Authorization token should start with Bearer" })
      .status(401);
  } 
  const jwtToken = token?.substring(7, token.length);
  try {
    if (jwtToken) {
      const decoded = jwt.verify(jwtToken, CONFIG.JWT_SECRET || "");
      req.user = decoded;
      next()
    }
  } catch (err) {
    return res.json({ msg: "Invalid token" }).status(401);
  }
};
