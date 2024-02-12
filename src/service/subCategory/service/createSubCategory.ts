import { getCategory } from "../../category/service";
import SubCategory from "../model";
import findByName from "./findByName";

const createSubCategory = async (name: string, category: string) => {
  const isSubCategoryExists = await findByName(name, category);
  if (isSubCategoryExists) {
    return { status: 400, data: null, message: "Sub Category Already Exists." };
  }

  const isCategoryExists = await getCategory({ name: category }, 1, 10);
  if (!isCategoryExists.length) {
    return { status: 400, data: null, message: "Category Not Valid." };
  }

  const newSubCategory = new SubCategory({
    name,
    category,
  });

  await newSubCategory.save();
  return {
    status: 200,
    data: newSubCategory,
    message: "Sub Category Created.",
  };
};

export default createSubCategory;
