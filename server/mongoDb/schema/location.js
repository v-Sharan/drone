import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LocationSchema = new Schema(
  {
    accuracy: { type: Number, required: true },
    altitude: { type: Number, required: true },
    altitudeAccuracy: { type: Number, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    type: { type: String, required: true },
    status: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export const Location = mongoose.model("Location", LocationSchema);
