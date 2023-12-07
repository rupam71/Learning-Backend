import SubCategory from "../model";

const deleteSubCategory = async (id: string) => {
  const deletedCategory = await SubCategory.findByIdAndDelete(id);
  return { status: 200, data: deletedCategory, message: "Sub Category Deleted." };
};

export default deleteSubCategory;
