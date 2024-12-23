import { Request, RequestHandler, Response } from "express";
import shortid from "shortid";
import CONFIG from "../config/config";
import apiServices from "../services/apiServices";
import { IClicks } from "../models/click.model";
import { UAParser } from "ua-parser-js";
import mongoose from "mongoose";
import { Middleware } from "../types/global";
import clickServices from "../services/clickServices";

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
    if (!gid) {
      res.status(400).json({ error: "Invalid Params" })
      return
    }

    const data = await apiServices.getLinkByGid(gid);
    if (!data?._id) {
      res.json({ error: 'Invalid Url' }).status(400)
      return
    }

    const userAgent = req.headers['user-agent'] || '';
    // pare os details
    const parser = new UAParser(userAgent);

    const clickData: IClicks = {
      link: data._id,
      ip_address: req.ip || '',
      device: parser.getDevice(),
      os: parser.getOS()
    }
    await clickServices.createClick(clickData)

    res.json(data);

  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
