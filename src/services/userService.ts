import mongoose from "mongoose";
import User, { IUser } from "../models/user.model";

export default {
  insertUser: async (userData: Partial<IUser>): Promise<IUser> => {
    const user = new User(userData);
    return await user.save();
  },
  getUserByEmail: async (email: string): Promise<IUser | null> => {
    return await User.findOne({ email });
  },
  getUserDetails: async (userId: string) => {
    return await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: 'links',
          localField: '_id',
          foreignField: 'user',
          as: 'links',
        }
      },
      {
        $project: {
          "username": 1,
          "email": 1,
          "totalUrls": { $size: '$links' },
        },
      },
      {
        $lookup: {
          from: 'clicks',
          localField: '_id',
          foreignField: 'user',
          as: 'clicks',
        }
      },
      {
        $project: {
          "username": 1,
          "email": 1,
          "totalUrls": 1,
          "totalClicks": { $size: '$clicks' },
        },
      },
      {
        $lookup: {
          from: 'clicks',
          localField: '_id',
          foreignField: 'user',
          as: 'uniqueClicks',
          pipeline: [
            { $group: { _id: { ip: '$ip_address', link: '$link' } } },
          ],
        }
      },
      {
        $project: {
          "username": 1,
          "email": 1,
          "totalUrls": 1,
          "totalClicks": 1,
          "uniqueClicks": { $size: '$uniqueClicks' },
        },
      },
      {
        $lookup: {
          from: 'clicks',
          localField: '_id',
          foreignField: 'user',
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
          foreignField: 'user',
          as: 'osType',
          pipeline: [
            { $group: { _id: '$os.name', uniqueClicks: { $addToSet: '$ip_address' }, uniqueUsers: { $addToSet: '$user' } } },
            {
              $project: {
                _id: 0,
                osName: '$_id',
                uniqueClicks: { $size: '$uniqueClicks' },
                uniqueUsers: { $size: '$uniqueUsers' },
              },
            }

          ],
        }
      },
      {
        $lookup: {
          from: 'clicks',
          localField: '_id',
          foreignField: 'user',
          as: 'deviceType',
          pipeline: [
            { $group: { _id: '$device.type', items: { $push: '$$ROOT' } } },
            { $addFields: { uniqueClicks: '$items' } },
            { $addFields: { uniqueUsers: '$items' } },


            // { $group: { _id: '$device.type', uniqueClicks: { $addToSet: '$ip_address' }, uniqueUsers: { $addToSet: '$user' } } },
            {
              $project: {
                _id: 0,
                deviceName: '$_id',
                uniqueClicks: { $size: '$uniqueClicks' },
                uniqueUsers: { $size: '$uniqueUsers' },
              },
            }

          ],
        }
      }
    ])
  }
}