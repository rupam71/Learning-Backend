import Category from "./../model";

export const deleteCategory = async (id: string) => {
  const deletedCategory = await Category.findByIdAndDelete(id);
  return { status: 200, data: deletedCategory, message: "Category Deleted." };
};

export default deleteCategory;
