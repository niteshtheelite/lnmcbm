import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
  {
    rollNumber: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
    semester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Semester",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

studentSchema.index({ rollNumber: 1, course: 1 }, { unique: true });

export const Student = mongoose.model("Student", studentSchema);
