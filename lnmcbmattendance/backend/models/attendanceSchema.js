import mongoose, { Schema } from "mongoose";

const attendanceSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  semester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Semester",
    required: true,
  },
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section",
    required: true,
  },
  duration: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Duration",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  students: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
      present: {
        type: Boolean,
        default: false,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
export const Attendance = mongoose.model("Attendance", attendanceSchema);
