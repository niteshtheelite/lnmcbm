import mongoose, { Schema } from "mongoose";

const attendanceSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: { type: Date, default: Date.now },
  course: { type: String, required: true },
  department: { type: String, required: true },
  session: { type: String, required: true },
  semester: { type: String, required: true },
  classDuration: { type: String, required: true },
  students: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
      present: { type: Boolean, default: false },
    },
  ],
  submittedAt: { type: Date, default: Date.now },
});
export const Attendance = mongoose.model("Attendance", attendanceSchema);
