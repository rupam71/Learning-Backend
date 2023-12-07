import Category from "./../model";

const getCategory = async (query: any, page: number, limit: number) => {
  try {
    var category = await Category.find(query);
    return category;
  } catch (e) {
    throw new Error("Error while Paginating Users");
  }
};

export default getCategory;
