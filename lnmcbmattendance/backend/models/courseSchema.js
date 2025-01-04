import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
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

export const courseDetails = mongoose.model("courseDetails", courseSchema);
