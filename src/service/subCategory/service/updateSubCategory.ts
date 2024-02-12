import { getCategory } from "../../category/service";
import SubCategory from "../model";
import findByName from "./findByName";

const updateSubCategory = async (
  id: string,
  name: string,
  category: string,
) => {
  const isSubCategoryExists = await findByName(name, category);
  if (isSubCategoryExists) {
    return { status: 400, data: null, message: "Sub Category Already Exists." };
  }
  const isCategoryExists = await getCategory({ name: category }, 1, 10);
  if (!isCategoryExists.length) {
    return { status: 400, data: null, message: "Category Not Valid." };
  }

  const updatedSubCategory = await SubCategory.findByIdAndUpdate(
    id,
    { name, category },
    { new: true },
  );

  return {
    status: 200,
    data: updatedSubCategory,
    message: "Sub Category Updated.",
  };
};

export default updateSubCategory;
