import { Attendance } from "../models/attendanceSchema.js";
import { Student } from "../models/studentSchema.js";

const createAttendance = async (req, res) => {
  try {
    const { courseId, semesterId, sectionId, durationId, students } = req.body;

    if (!courseId || !semesterId || !sectionId || !durationId || !students) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Check if attendance already exists for the same duration and date
    const existingAttendance = await Attendance.findOne({
      course: courseId,
      semester: semesterId,
      section: sectionId,
      duration: durationId,
      date: { $gte: new Date(today), $lt: new Date(today + "T23:59:59.999Z") },
    });

    if (existingAttendance) {
      return res.status(400).json({
        message: "Attendance for this duration has already been taken today!",
      });
    }

    // If no duplicate attendance, save the new record
    const attendance = new Attendance({
      course: courseId,
      semester: semesterId,
      section: sectionId,
      duration: durationId,
      students,
      date: new Date(),
    });

    await attendance.save();
    res.status(201).json({ message: "Attendance marked successfully" });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ message: error.message });
  }
};

const getAttendancePercentage = async (req, res) => {
  try {
    // Get all attendance records
    const attendanceRecords = await Attendance.find()
      .populate("course")
      .populate("semester")
      .populate("section")
      .populate("students.student");

    // Calculate percentage for each student
    const studentPercentages = {};

    // Process each attendance record
    attendanceRecords.forEach((record) => {
      record.students.forEach((studentAttendance) => {
        const studentId = studentAttendance.student._id.toString();

        if (!studentPercentages[studentId]) {
          studentPercentages[studentId] = {
            studentName: studentAttendance.student.name,
            totalClasses: 0,
            presentClasses: 0,
            percentage: 0,
          };
        }

        studentPercentages[studentId].totalClasses += 1;
        if (studentAttendance.present) {
          studentPercentages[studentId].presentClasses += 1;
        }
      });
    });

    // Calculate final percentages
    Object.keys(studentPercentages).forEach((studentId) => {
      const student = studentPercentages[studentId];
      student.percentage = (
        (student.presentClasses / student.totalClasses) *
        100
      ).toFixed(2);
    });

    // Convert to array and sort by percentage
    const results = Object.entries(studentPercentages)
      .map(([studentId, data]) => ({
        studentId,
        ...data,
      }))
      .sort((a, b) => b.percentage - a.percentage);

    res.status(200).json({
      totalStudents: results.length,
      attendanceData: results,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error calculating attendance percentage",
      error: error.message,
    });
  }
};

export { createAttendance, getAttendancePercentage };
