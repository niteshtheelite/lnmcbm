import { Duration } from "../models/durationSchema.js";

const createDuration = async (req, res) => {
  try {
    const newDuration = new Duration(req.body);
    await newDuration.save();
    res.status(201).json(newDuration);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating course", error: err });
  }
};

const getDuration = async (req, res) => {
  try {
    const courses = await Duration.find();
    res.status(200).json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error getting courses", error: err });
  }
};

export { createDuration, getDuration };
