import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LocationSchema = new Schema(
  {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    type: { type: String, required: true },
    status: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export const Location = mongoose.model("Location", LocationSchema);
