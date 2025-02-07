import { Student } from "../models/studentSchema.js";
import { Attendance } from "../models/attendanceSchema.js";

const createAttendance = async (req, res) => {
  try {
    const newAttendance = new Attendance(req.body);
    const attendanceRecords = Student.map((student) => ({
      student: student._id,
      date,
      duration,
      present: student.present,
    }));

    await newAttendance.insertMany(attendanceRecords);
    res.json({ message: "Attendance Saved sucessfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error updating student", error: error.message });
  }
};

export { createAttendance };
