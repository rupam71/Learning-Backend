import { getCategory } from "../../category/service";
import { getSubCategory } from "../../subCategory/service";
import Learning from "../model";
import { ILearning } from "../type";

const createLearning = async (body: ILearning) => {
  const isCategoryExists = await getCategory({ name: body.category }, 1, 10);
  if (!isCategoryExists.length) {
    return { status: 400, data: null, message: "Category Not Valid." };
  }

  const isSubCategoryExists = await getSubCategory({ name: body.subCategory }, 1, 10);
  if (!isSubCategoryExists.length) {
    return { status: 400, data: null, message: "Sub Category Not Valid." };
  }

  const newLearning = new Learning(body);

  await newLearning.save();
  return { status: 200, data: newLearning, message: "New Learning Created." };
};

export default createLearning;
