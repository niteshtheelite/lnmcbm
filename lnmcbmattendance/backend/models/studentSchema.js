import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
  {
    rollNumber: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    department: { type: String, required: true },
    session: { type: Number, required: true },
    semester: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Student = mongoose.model("Student", studentSchema);
