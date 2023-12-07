import Category from "./../model";
import findByName from "./findByName";

export const createCategory = async (name: string) => {
  const isCategoryExists = await findByName(name);
  if (isCategoryExists) {
    return { status: 400, data: null, message: "Category Already Exists." };
  }

  const newCategory = new Category({
    name,
  });

  await newCategory.save();
  return { status: 200, data: newCategory, message: "Category Created." };
};

export default createCategory;
