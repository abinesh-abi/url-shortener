import mongoose, { Schema, Document } from "mongoose";

export interface ILink extends Document {
  originalUrl: string;
  generatedUrl: string;
  GID: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const linkSchema = new Schema({
  originalLink: {
    type: String,
    unique: true,
    required: true,
  },
  generatedLink: String,
  GID: {
    type: String,
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Link = mongoose.model<ILink>("Link", linkSchema);
