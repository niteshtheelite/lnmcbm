import { StudentDeatails } from "../models/studentSchema.js";

const createStudent = async (req, res) => {
  try {
    const newStudent = new StudentDeatails(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Error creating student", error: err });
  }
};
const getStudents = async (req, res) => {
  try {
    const Students = await StudentDeatails.find();

    res.status(200).json(Students);
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Error geting student", error: err });
  }
};
const updateStudent = async (req, res) => {
  try {
    const Students = await StudentDeatails.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (Students) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(Students);
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Error updating student", error: err });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const Students = await StudentDeatails.findByIdAndDelete(req.params.id);
    if (!Students) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting student", error: err });
  }
};

export { createStudent, getStudents, updateStudent, deleteStudent };
