import Joi from "joi";
import { ShortenUrlPost } from "../controller/apiController";

export const shortenSchema = Joi.object<ShortenUrlPost>({
  url: Joi.string().uri().required(),
  alias: Joi.string().empty(),
  topic: Joi.string().empty(),
});
