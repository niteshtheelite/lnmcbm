import { Student } from "../models/studentSchema.js";

const createStudent = async (req, res) => {
  try {
    // Extract student data from the request body
    const { rollNumber, name, department, session, semester } = req.body;

    // Create a new student instance
    const newStudent = new Student({
      rollNumber,
      name,
      department,
      session,
      semester,
    });

    // Save the student to the database
    const savedStudent = await newStudent.save();

    // Respond with the created student
    res.status(201).json({
      message: "Student created successfully",
      student: savedStudent,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({
      message: "Error creating student",
      error: error.message,
    });
  }
};
const getStudents = async (req, res) => {
  try {
    const Students = await Student.find();

    res.status(200).json(Students);
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Error geting student", error: err });
  }
};
const updateStudent = async (req, res) => {
  try {
    const { rollNumber, name, department, session, semester } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { rollNumber, name, department, session, semester },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error updating student", error: error.message });
  }
};
const deleteStudent = async (req, res) => {
  try {
    const Students = await Student.findByIdAndDelete(req.params.id);
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
