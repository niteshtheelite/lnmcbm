import { Attendance } from "../models/attendanceSchema.js";

const createAttendance = async (req, res) => {
  try {
    const { teacherId, courseId, semesterId, sectionId, durationId, students } =
      req.body;

    // Check if attendance already exists for today with the same parameters
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const existingAttendance = await Attendance.findOne({
      teacher: teacherId,
      course: courseId,
      semester: semesterId,
      section: sectionId,
      duration: durationId,
      createdAt: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    if (existingAttendance) {
      return res.status(409).json({
        message: "Attendance has already been taken for this duration today",
      });
    }

    // If no existing attendance, create new attendance
    const attendance = new Attendance({
      teacher: teacherId,
      course: courseId,
      semester: semesterId,
      section: sectionId,
      duration: durationId,
      students: students.map((student) => ({
        student: student.studentId,
        present: student.present,
      })),
    });

    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAttendancePercentage = async (req, res) => {
  try {
    const { courseId, semesterId, sectionId } = req.query;

    // Find all students in the selected course, semester, and section
    const students = await Student.find({
      course: courseId,
      semester: semesterId,
      section: sectionId,
    });

    if (students.length === 0) {
      return res
        .status(404)
        .json({ message: "No students found for the selected criteria." });
    }

    // Find attendance records for the selected course, semester, and section
    const attendanceRecords = await Attendance.find({
      course: courseId,
      semester: semesterId,
      section: sectionId,
    });

    if (attendanceRecords.length === 0) {
      return res.status(404).json({ message: "No attendance records found." });
    }

    // Calculate attendance percentage for each student
    const attendanceData = students.map((student) => {
      let totalClasses = 0;
      let presentCount = 0;

      attendanceRecords.forEach((record) => {
        const studentAttendance = record.students.find(
          (s) => s.student.toString() === student._id.toString()
        );

        if (studentAttendance) {
          totalClasses++;
          if (studentAttendance.present) {
            presentCount++;
          }
        }
      });

      const percentage =
        totalClasses > 0 ? ((presentCount / totalClasses) * 100).toFixed(2) : 0;

      return {
        studentId: student._id,
        name: student.name,
        rollNumber: student.rollNumber,
        percentage: `${percentage}%`,
      };
    });

    res.status(200).json(attendanceData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createAttendance, getAttendancePercentage };
