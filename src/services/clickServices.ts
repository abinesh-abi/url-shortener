import mongoose from "mongoose";
import { Clicks, IClicks } from "../models/click.model";

export default {
    createClick: async (data: IClicks): Promise<IClicks> => {
        const click = new Clicks(data);
        return await click.save();
    },
    getAnalyticsOverall: async (userId:string) => {
        console.log(userId)
        return await Clicks.aggregate([
            {$match:{user:new mongoose.Types.ObjectId(userId)}}
        ])
    }
}


