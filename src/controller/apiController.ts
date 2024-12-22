import { Request, Response } from "express";
import shortid from "shortid";
import CONFIG from "../config/config";
import apiServices from "../services/apiServices";

export type ShortenUrlPost = {
  url: string;
  alias?: string;
  topic?: string;
};

export const createLink = async (
  req: Request<{}, {}, ShortenUrlPost>,
  res: Response
) => {
  try {
    const { url, alias, topic } = req?.body || {};
    const gid: string = alias || shortid.generate();
    const generatedUrl = `${CONFIG.BASE_URL}/api/shorten/${gid}`;
    const data = await apiServices.crateLink({
      originalUrl: url,
      GID: gid,
      generatedUrl,
      topic
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getLinkById = async (req: Request, res: Response) => {
  try {
    const gid = req.params.gid;
    if (!gid) res.status(400).json({ error: "Invalid Params" });
    const data = await apiServices.getLinkByGid(gid);
    res.json(data);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
