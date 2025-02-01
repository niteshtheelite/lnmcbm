import mongoose, { Schema } from "mongoose";

const sectionSchema = new Schema(
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

export const Section = mongoose.model("Section", sectionSchema);
