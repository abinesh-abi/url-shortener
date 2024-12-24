import mongoose from "mongoose";
import { ILink, Link } from "../models/Link.model";

export default {
  crateLink(body: ILink) {
    const newUrl = new Link(body);
    return newUrl.save();
  },
  getLinkByGid(GID: string) {
    return Link.findOne({ GID }, { originalUrl: 1, user: 1, topic: 1 });
  },
  getAnalyticsByTopic: async (topic: string, userId: string) => {
    return await Link.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId), topic } },
      {
        $lookup: {
          from: 'clicks',
          localField: 'topic',
          foreignField: 'topic',
          as: 'totalClicks',
        }
      },
      {
        $lookup: {
          from: 'clicks',
          localField: 'topic',
          foreignField: 'topic',
          as: 'uniqueClicks',
          pipeline: [
            { $group: { _id: { ip: '$ip_address', toic: '$topic' } } },
          ],
        }
      },
      {
        $lookup: {
          from: 'clicks',
          localField: 'topic',
          foreignField: 'topic',
          as: 'clicksByDate',
          pipeline: [
            {
              $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                items: { $push: '$$ROOT' },

              }
            },
            {
              $project: {
                _id: 0,
                date: '$_id',
                totalClicks: { $size: '$items' },
              },
            }
          ],
        }
      },
      {
        $lookup: {
          from: 'clicks',
          localField: '_id',
          foreignField: 'link',
          as: 'urls',
          let: {
            shortUrl: '$generatedUrl',
          },
          pipeline: [
            //   { $group: { _id: '$os.name', uniqueClicks: { $addToSet: '$ip_address' }, uniqueUsers: { $addToSet: '$user' } } },
    
            {
              $project: {
                _id: 0,
                link: '$_id',
                shortUrl: '$shortUrl',
                // uniqueUsers: { $size: '$uniqueUsers' },
              },
            }

          ],
        }
      },
      // {
      //   $project: {
      //     "_id": 0,
      //     "topic": 1,
      //     urls: 1,
      //     "uniqueClicks": { $size: '$uniqueClicks' },
      //     "totalClicks": { $size: '$totalClicks' },
      //   },
      // },
    ])
  }
};
