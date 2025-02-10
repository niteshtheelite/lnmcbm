import mongoose, { Schema } from "mongoose";

const semesterSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Semester = mongoose.model("Semester", semesterSchema);
