import Category from "./../model";
import findByName from "./findByName";

export const updateCategory = async (id: string, name: string) => {
  const isCategoryExists = await findByName(name);
  if (isCategoryExists) {
    return { status: 400, data: null, message: "Category Already Exists." };
  }

  const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true });

  return { status: 200, data: updatedCategory, message: "Category Updated." };
};

export default updateCategory;
