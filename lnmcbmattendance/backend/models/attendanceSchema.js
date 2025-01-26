import mongoose, { Schema } from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courseDetails",
      required: true,
    },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sectionDetails",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    attendance: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
          required: true,
        },
        isPresent: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
export const attendanceDeatails = mongoose.model(
  "attendanceDeatails",
  attendanceSchema
);
