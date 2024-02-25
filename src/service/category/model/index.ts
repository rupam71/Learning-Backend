import mongoose, { Document, Schema } from "mongoose";
import { ICategory } from "../type";

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  desciption: {
    type: String,
  },
  image: {
    type: String,
  },
});

const Category = mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
