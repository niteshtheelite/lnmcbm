import mongoose, { Schema } from "mongoose";

const durationSchema = new Schema(
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

export const Duration = mongoose.model("Duration", durationSchema);
