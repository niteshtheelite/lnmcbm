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

export const sectionDetails = mongoose.model("sectionDetails", sectionSchema);
