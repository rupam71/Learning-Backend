import mongoose, { Document, Schema } from "mongoose";
import { ILearning } from "../type";

const LearningSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  command: {
    type: String,
  },
});

const Learning = mongoose.model<ILearning>("Learning", LearningSchema);

export default Learning;
