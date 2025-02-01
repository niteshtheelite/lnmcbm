import { Student } from "../models/studentSchema.js";
import { Attendance } from "../models/attendanceSchema.js";

const submitAttendance = async (req, res) => {
  const { course, department, session, semester, classDuration, students } =
    req.body;

  const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);
  const existing = await Attendance.findOne({
    teacher: req.user.id,
    course,
    department,
    session,
    semester,
    submittedAt: { $gte: twelveHoursAgo },
  });

  if (existing) throw new Error("Attendance already submitted for 12 hours");

  const studentList = await Student.find({ department, session, semester });

  const attendance = await Attendance.create({
    teacher: req.user.id,
    course,
    department,
    session,
    semester,
    classDuration,
    students: studentList.map((student) => ({
      student: student._id,
      present: students.includes(student._id.toString()),
    })),
  });

  res.status(201).json(attendance);
};

export { submitAttendance };
