import Category from "./../model";
import findByName from "./findByName";

export const createCategory = async (query: any) => {
  const isCategoryExists = await findByName(query.name);
  if (isCategoryExists) {
    return { status: 400, data: null, message: "Category Already Exists." };
  }

  const newCategory = new Category(query);

  await newCategory.save();
  return { status: 200, data: newCategory, message: "Category Created." };
};

export default createCategory;
