import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dateOfBirth: { type: Date, required: true },
    contactNumber: { type: String, required: true },
    address: { type: String, required: true },
    enrollmentDate: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export const StudentDeatails = mongoose.model("StudentDeatails", studentSchema);
