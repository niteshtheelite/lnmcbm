import { Subject } from "../models/subjectSchema.js";
import { Course } from "../models/courseSchema.js";

// 📚 1. Create a New Subject
export const createSubject = async (req, res) => {
  try {
    const { name, course } = req.body;

    // ⚡️ Check if Course Exists
    const courseExists = await Course.findById(course);
    if (!courseExists) {
      return res.status(404).json({ message: "Course not found" });
    }

    // ✅ Check if Subject Already Exists for the Same Course
    const existingSubject = await Subject.findOne({ name, course });
    if (existingSubject) {
      return res.status(400).json({
        message:
          "Subject with this name already exists for the selected course.",
      });
    }

    // ✅ Create New Subject
    const subject = await Subject.create({ name, course });

    res.status(201).json({
      success: true,
      message: "Subject added successfully!",
      data: subject,
    });
  } catch (error) {
    console.error("Error adding subject:", error.message);
    res.status(500).json({
      success: false,
      message: "Error adding subject",
      error: error.message,
    });
  }
};

//
// 🎯 1. Get All Subjects or Subject by ID
//
export const getSubjects = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ If ID is provided, get a single subject
    if (id) {
      const subject = await Subject.findById(id).populate("course", "name");
      if (!subject) {
        return res.status(404).json({ message: "Subject not found" });
      }
      return res.status(200).json({ success: true, data: subject });
    }

    // ✅ Get All Subjects if no ID is provided
    const subjects = await Subject.find().populate("course", "name");
    res.status(200).json({
      success: true,
      count: subjects.length,
      data: subjects,
    });
  } catch (error) {
    console.error("Error fetching subject(s):", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching subject(s)",
      error: error.message,
    });
  }
};

//
// 🎯 2. Update Subject by ID
//
export const updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, course } = req.body;

    // ✅ Check if Course Exists
    const courseExists = await Course.findById(course);
    if (!courseExists) {
      return res.status(404).json({ message: "Course not found" });
    }

    // ✅ Check for Duplicate Subject with Same Name & Course
    const duplicateSubject = await Subject.findOne({
      name,
      course,
      _id: { $ne: id }, // Exclude current subject
    });
    if (duplicateSubject) {
      return res.status(400).json({
        message:
          "Subject with this name already exists for the selected course.",
      });
    }

    // ✅ Update Subject
    const updatedSubject = await Subject.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedSubject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.status(200).json({
      success: true,
      message: "Subject updated successfully!",
      data: updatedSubject,
    });
  } catch (error) {
    console.error("Error updating subject:", error.message);
    res.status(500).json({
      success: false,
      message: "Error updating subject",
      error: error.message,
    });
  }
};

//
// 🎯 3. Delete Subject by ID
//
export const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Delete Subject
    const deletedSubject = await Subject.findByIdAndDelete(id);

    if (!deletedSubject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.status(200).json({
      success: true,
      message: "Subject deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting subject:", error.message);
    res.status(500).json({
      success: false,
      message: "Error deleting subject",
      error: error.message,
    });
  }
};
