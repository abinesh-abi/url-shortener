import { Request, Response } from "express";

type ShortenPost = {
  longUrl: String;
  customAlias?: string;
  topic?: string;
};

export const createLink = (
  req: Request<{}, {}, ShortenPost>,
  res: Response
) => {
  const { longUrl, customAlias, topic } = req.body;
  console.log({ longUrl, customAlias, topic });
  res.json({ msg: "test" });
};
