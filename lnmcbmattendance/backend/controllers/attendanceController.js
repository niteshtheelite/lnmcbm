import { Attendance } from "../models/attendanceSchema.js";

const createAttendance = async (req, res) => {
  try {
    const { courseId, semesterId, sectionId, durationId, students } = req.body;

    const attendance = new Attendance({
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

export { createAttendance };
