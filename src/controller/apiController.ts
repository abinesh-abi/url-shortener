import { Request, RequestHandler, Response } from "express";
import shortid from "shortid";
import CONFIG from "../config/config";
import apiServices from "../services/apiServices";
import { IClicks } from "../models/click.model";
import { UAParser } from "ua-parser-js";
import mongoose from "mongoose";
import { Middleware } from "../types/global";
import clickServices from "../services/clickServices";
import userService from "../services/userService";

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
    const user: any = req?.user
    const user_id: string = user?.user?._id

    const { url, alias, topic } = req?.body || {};
    const gid: string = alias || shortid.generate();
    const generatedUrl = `${CONFIG.BASE_URL}/api/shorten/${gid}`;

    const data = await apiServices.crateLink({
      user: new mongoose.Types.ObjectId(user_id),
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
    // parse os details
    const parser = new UAParser(userAgent);

    const clickData: IClicks = {
      user: data.user,
      link: data._id,
      topic:data.topic,
      ip_address: req.ip || '',
      device: parser.getDevice(),
      os: parser.getOS()
    }
    console.log(clickData)
    await clickServices.createClick(clickData)

    res.json(data);

  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};


export const getOverallAnalytics = async (req: Request, res: Response) => {
  try {
    const user: any = req?.user
    const userId: string = user?.user?._id
    const data = await userService.getAnalyticsOverall(userId)

    res.json(data)
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: "Internal Server Error" });
  }
}


export const getAnalyticsByTopic = async (req: Request, res: Response) => {
  try {
    const topic = req.params.topic;
    if (!topic) {
      res.status(400).json({ error: "Invalid Params" })
      return
    }

    const user: any = req?.user
    const userId: string = user?.user?._id
    const data = await apiServices.getAnalyticsByTopic(topic, userId)

    res.json(data)
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

