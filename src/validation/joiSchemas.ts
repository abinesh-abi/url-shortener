import Joi from "joi";
import { ShortenUrlPost } from "../controller/apiController";

export const shortenSchema = Joi.object<ShortenUrlPost>({
  longUrl: Joi.string().uri().required(),
});
