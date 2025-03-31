import { Subject } from "../models/subjectSchema.js";

export const createSubject = async (req, res) => {
  try {
    const { name, course, semester } = req.body;

    // Validate required fields
    if (!name || !course || !semester) {
      return res.status(400).json({
        success: false,
        message: "Name, course, and semester are required",
      });
    }

    // Check if subject with the same name, course, and semester already exists
    const existingSubject = await Subject.findOne({ name, course, semester });
    if (existingSubject) {
      return res.status(400).json({
        success: false,
        message:
          "Subject with the same name, course, and semester already exists",
      });
    }

    // Create new subject
    const subject = await Subject.create({
      name,
      course,
      semester,
    });

    // Return the newly created subject
    res.status(201).json({
      success: true,
      data: subject,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getSubjectsByCourseAndSemester = async (req, res) => {
  try {
    const { courseId, semesterId } = req.query;

    // Validate if both course and semester are provided
    if (!courseId || !semesterId) {
      return res.status(400).json({
        success: false,
        message: "Both courseId and semesterId are required",
      });
    }

    // Fetch subjects matching the course and semester
    const subjects = await Subject.find({
      course: courseId,
      semester: semesterId,
    }).populate("course semester");

    // Check if subjects exist
    if (subjects.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No subjects found for the selected course and semester",
      });
    }

    // Return subjects if found
    res.status(200).json({
      success: true,
      count: subjects.length,
      data: subjects,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getAllSubjects = async (req, res) => {
  try {
    // Fetch all subjects and populate course and semester details
    const subjects = await Subject.find().populate("course semester");

    // Check if subjects exist
    if (!subjects || subjects.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No subjects found",
      });
    }

    res.status(200).json({
      success: true,
      count: subjects.length,
      data: subjects,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateSubject = async (req, res) => {
  try {
    const { name, course, semester } = req.body;
    const { id } = req.params;

    // Validate required fields
    if (!name || !course || !semester) {
      return res.status(400).json({
        success: false,
        message: "Name, course, and semester are required",
      });
    }

    // Check if subject exists
    const subject = await Subject.findById(id);
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    // Update subject details
    subject.name = name;
    subject.course = course;
    subject.semester = semester;

    const updatedSubject = await subject.save();

    res.status(200).json({
      success: true,
      data: updatedSubject,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if subject exists
    const subject = await Subject.findById(id);
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
      });
    }

    // Delete the subject
    await subject.deleteOne();

    res.status(200).json({
      success: true,
      message: "Subject deleted successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
