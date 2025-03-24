import mongoose, { Schema } from "mongoose";

const subjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", // Link to Course Model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Subject = mongoose.model("Subject", subjectSchema);
