import { string } from "joi";
import mongoose, { Schema, Document } from "mongoose";
import { IData, IDevice, IOS } from "ua-parser-js";

export interface IClicks {
  user: mongoose.Types.ObjectId;
  link: mongoose.Types.ObjectId;
  os: IOS;
  device: IDevice;
  ip_address: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const clickSchema = new Schema<IClicks>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    link: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Link",
      required: true,
    },
    os: {
      name: String,
      version: String
    },
    device: {
      type: {type:String},
      model: String,
      vendor: String,
    },
    ip_address: String,
  },
  { timestamps: true }
);

export const Clicks = mongoose.model<IClicks>("Clicks", clickSchema);
