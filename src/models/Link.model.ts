import mongoose, { Schema, Document } from "mongoose";

export interface ILink  {
  originalUrl: string;
  generatedUrl?: string;
  topic?: string;
  GID: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const linkSchema = new Schema<ILink>(
  {
    originalUrl: {
      type: String,
      // unique: true,
      required: true,
    },
    generatedUrl: String,
    GID: {
      type: String,
      unique: true,
      required: true,
    },
    topic: String,
  },
  { timestamps: true }
);

export const Link = mongoose.model<ILink>("Link", linkSchema);
