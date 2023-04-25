import { Location } from "../mongoDb/schema/location.js";

export const getRequest = async (req, res) => {
  const locations = await Location.find();

  res.status(200).json({ locations });
};

export const createlocation = async (req, res) => {
  const { accuracy, altitude, altitudeAccuracy, latitude, longitude, type } =
    req.body;

  const createLocation = new Location({
    accuracy,
    altitude,
    altitudeAccuracy,
    latitude,
    longitude,
    type,
  });

  const location = await createLocation.save();

  res.status(201).json({ location });
};
