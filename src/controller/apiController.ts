import { Request, Response } from "express";
import shortid from "shortid";

export type ShortenUrlPost = {
  longUrl: String;
  customAlias?: string;
  topic?: string;
};

export const createLink = async (
  req: Request<{}, {}, ShortenUrlPost>,
  res: Response
) => {
  try {
    const { longUrl, customAlias, topic } = req?.body || {};
    console.log({ longUrl, customAlias, topic });
    res.json({ msg: "test" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
