import { attendanceDeatails } from "../models/attendanceSchema.js";

const createAttendance = async (req, res) => {
  try {
    const { course, section, date, students } = req.body;

    // Find the associated Course, Section, and Student documents
    const foundCourse = await Course.findById(course);
    const foundSection = await Section.findById(section);

    if (!foundCourse || !foundSection) {
      return res.status(404).json({ message: "Course or Section not found" });
    }

    const attendance = new Attendance({
      course: foundCourse,
      section: foundSection,
      date,
      students: await Promise.all(
        students.map(async (studentData) => ({
          student: await Student.findById(studentData.student),
          isPresent: studentData.isPresent,
        }))
      ),
    });

    await attendance.save();

    res.status(201).json(attendance);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error creating attendance", error: error });
  }
};

// Get all attendance records
const getAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.find()
      .populate("course")
      .populate("section")
      .populate("students.student");

    res.status(200).json(attendances);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error getting attendances", error: error });
  }
};

// Get attendance by ID
const getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id)
      .populate("course")
      .populate("section")
      .populate("students.student");

    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    res.status(200).json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting attendance", error: error });
  }
};

// Update attendance by ID
const updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate("course")
      .populate("section")
      .populate("students.student");

    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    res.status(200).json(attendance);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error updating attendance", error: error });
  }
};

// Delete attendance by ID
const deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);

    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    res.status(200).json({ message: "Attendance deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error deleting attendance", error: error });
  }
};

export {
  createAttendance,
  getAttendances,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
};
