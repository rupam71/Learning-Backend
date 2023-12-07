import SubCategory from "../model";

const getSubCategory = async (query: any, page: number, limit: number) => {
  try {
    const subCategory = await SubCategory.find(query);
    return subCategory;
  } catch (e) {
    throw new Error("Error while Paginating Users");
  }
};

export default getSubCategory;
