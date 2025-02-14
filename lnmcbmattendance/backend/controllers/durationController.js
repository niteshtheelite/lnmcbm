import { Duration } from "../models/durationSchema.js";

const createDuration = async (req, res) => {
  try {
    const { name } = req.body;
    const durationExist = await Duration.findOne({ name });
    if (durationExist) {
      return res.status(409).json({
        message: "duration already exists",
      });
    }
    const newDuration = await new Duration({ name }).save();
    res.status(201).json(newDuration);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating course", error: err });
  }
};

const getDuration = async (req, res) => {
  try {
    const durations = await Duration.find();

    // Custom sort function to handle time ranges
    const sortedDurations = durations.sort((a, b) => {
      // Extract start time from the range (before the hyphen)
      const startTimeA = parseFloat(a.name.split("-")[0]);
      const startTimeB = parseFloat(b.name.split("-")[0]);

      return startTimeA - startTimeB;
    });

    res.status(200).json(sortedDurations);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error getting courses",
      error: err,
    });
  }
};

export { createDuration, getDuration };
