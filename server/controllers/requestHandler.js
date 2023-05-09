import { Location } from "../mongoDb/schema/location.js";

export const getRequest = async (req, res) => {
  const locations = await Location.find();

  res.status(200).json({ locations });
};

export const createlocation = async (req, res) => {
  const { latitude, longitude, type } = req.body;

  const createLocation = new Location({
    latitude,
    longitude,
    type,
    status: false,
  });

  await createLocation.save();

  res.status(201).json({ message: "Send successfully" });
};

export const deleteLocation = async (req, res) => {
  const { id } = req.params;

  let location;

  try {
    location = await Location.findById(id);
  } catch (error) {
    res.send(501).json({ message: "Couldn't find Location" });
  }

  try {
    await location.deleteOne();
  } catch (error) {
    res.send(501).json({ message: "Couldn't Delete try again later" });
  }

  res.status(202).json({ message: "Deleted Successfully" });
};

export const updateLocation = async (req, res) => {
  const { id } = req.params;
  let location;

  try {
    location = await Location.findById(id);
  } catch (error) {
    res.send(501).json({ message: "Couldn't find Location" });
  }

  try {
    await location.updateOne({ status: !location.status });
  } catch (error) {
    res.send(501).json({ message: "Couldn't Update try again later" });
  }

  res.status(202).json({ message: "Update Successfully" });
};
