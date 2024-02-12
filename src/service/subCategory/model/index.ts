import mongoose, { Document, Schema } from "mongoose";
import { ISubCategory } from "../type";

const SubCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const SubCategory = mongoose.model<ISubCategory>(
  "SubCategory",
  SubCategorySchema,
);

export default SubCategory;
