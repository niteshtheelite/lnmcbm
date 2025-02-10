import { Semester } from "../models/semesterSchema.js";

const createSemester = async (req, res) => {
  try {
    const newSemester = new Semester(req.body);
    await newSemester.save();
    res.status(201).json(newSemester);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating course", error: err });
  }
};

const getSemester = async (req, res) => {
  try {
    const semester = await Semester.find();
    res.status(200).json(semester);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error getting courses", error: err });
  }
};

const getSemesterById = async (req, res) => {
  try {
    const semester = await Semester.findById(req.params.id);
    if (!semester) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(semester);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error getting course", error: err });
  }
};

const updateSemester = async (req, res) => {
  try {
    const semester = await Semester.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!semester) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(semester);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating course", error: err });
  }
};

const deleteSemester = async (req, res) => {
  try {
    const semester = await Semester.findByIdAndDelete(req.params.id);
    if (!semester) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting course", error: err });
  }
};

export {
  createSemester,
  getSemester,
  getSemesterById,
  updateSemester,
  deleteSemester,
};
