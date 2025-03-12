import { Attendance } from "../models/attendanceSchema.js";
import { Student } from "../models/studentSchema.js";
import { Course } from "../models/courseSchema.js";
import { Semester } from "../models/semesterSchema.js";

const createAttendance = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    const { courseId, semesterId, sectionId, durationId, students } = req.body;

    if (!courseId || !semesterId || !sectionId || !durationId || !students) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Get today's date
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

    // ✅ Define the start and end of the day
    const startOfDay = new Date(today); // Midnight (00:00:00)
    const endOfDay = new Date(today + "T23:59:59.999Z"); // End of day (23:59:59.999)

    // ✅ Prevent Duplicate Attendance (same day)
    const existingAttendance = await Attendance.findOne({
      course: courseId,
      semester: semesterId,
      section: sectionId,
      duration: durationId,
      date: { $gte: startOfDay, $lt: endOfDay }, // Date range filter
    });

    if (existingAttendance) {
      return res.status(400).json({
        message: "Attendance for this duration has already been taken today!",
      });
    }

    // ✅ Format Students Array
    const formattedStudents = students.map((item) => ({
      student: item.studentId,
      present: item.present,
    }));

    // ✅ Save Attendance
    const attendance = new Attendance({
      user: req.user._id,
      course: courseId,
      semester: semesterId,
      section: sectionId,
      duration: durationId,
      students: formattedStudents,
      date: new Date(),
    });

    await attendance.save();
    res.status(201).json({ message: "Attendance marked successfully" });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET ATTENDANCE PERCENTAGE OF STUDENT
const getAttendancePercentage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    // ✅ Find All Attendance Records For This Student
    const attendanceRecords = await Attendance.find({
      "students.student": id,
    });

    if (attendanceRecords.length === 0) {
      return res.status(404).json({ message: "No attendance record found" });
    }

    // ✅ Calculate Present & Total Days
    let totalClasses = 0;
    let presentClasses = 0;

    attendanceRecords.forEach((attendance) => {
      attendance.students.forEach((studentRecord) => {
        if (String(studentRecord.student) === String(id)) {
          totalClasses++;
          if (studentRecord.present) {
            presentClasses++;
          }
        }
      });
    });

    // ✅ Calculate Percentage
    const percentage = (presentClasses / totalClasses) * 100;

    res.status(200).json({
      totalClasses,
      presentClasses,
      percentage: `${percentage.toFixed(2)}%`,
    });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getFilteredAttendanceByName = async (req, res) => {
  try {
    const { courseName, semesterName } = req.query;

    if (!courseName || !semesterName) {
      return res
        .status(400)
        .json({ message: "Course Name and Semester Name are required" });
    }

    // ✅ Find Course ID Based on Course Name
    const course = await Course.findOne({ name: courseName });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // ✅ Find Semester ID Based on Semester Name
    const semester = await Semester.findOne({ name: semesterName });
    if (!semester) {
      return res.status(404).json({ message: "Semester not found" });
    }

    // ✅ Fetch Attendance Based On Filters
    const attendanceRecords = await Attendance.find({
      course: course._id,
      semester: semester._id,
    });

    if (attendanceRecords.length === 0) {
      return res.status(404).json({ message: "No attendance record found" });
    }

    // ✅ Calculate Total Classes, Present Classes
    let totalClasses = 0;
    let presentClasses = 0;

    attendanceRecords.forEach((attendance) => {
      attendance.students.forEach((studentRecord) => {
        totalClasses++;
        if (studentRecord.present) {
          presentClasses++;
        }
      });
    });

    // ✅ Calculate Attendance Percentage
    const percentage = ((presentClasses / totalClasses) * 100).toFixed(2);

    res.status(200).json({
      courseName,
      semesterName,
      totalClasses,
      presentClasses,
      percentage,
    });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getFilteredAttendance = async (req, res) => {
  try {
    const { courseId, semesterId, sectionId } = req.query;
    const query = {};

    if (courseId) query.course = mongoose.Types.ObjectId(courseId);
    if (semesterId) query.semester = mongoose.Types.ObjectId(semesterId);
    if (sectionId) query.section = mongoose.Types.ObjectId(sectionId);

    const students = await Attendance.find(query)
      .populate("course")
      .populate("semester")
      .populate("section")
      .sort({ rollNumber: 1 });

    res.json(students);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ message: "Error fetching attendance" });
  }
};

export const getAttendanceReport = async (req, res) => {
  try {
    const { courseId, semesterId, sectionId } = req.body;

    if (!courseId || !semesterId || !sectionId) {
      return res
        .status(400)
        .json({ message: "Course, Semester, and Section are required!" });
    }

    const students = await Student.find({
      course: courseId,
      semester: semesterId,
      section: sectionId,
    });
    const attendanceRecords = await Attendance.find({
      course: courseId,
      semester: semesterId,
      section: sectionId,
    });

    const totalClasses = attendanceRecords.length;
    const attendanceReport = students.map((student) => {
      const presentCount = attendanceRecords.filter((record) =>
        record.students.some(
          (s) => s.student.toString() === student._id.toString() && s.present
        )
      ).length;

      return {
        rollNumber: student.rollNumber,
        name: student.name,
        totalClasses,
        presentClasses: presentCount,
      };
    });

    res.status(200).json({ totalClasses, students: attendanceReport });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export {
  createAttendance,
  getAttendancePercentage,
  getFilteredAttendanceByName,
  getFilteredAttendance,
};
