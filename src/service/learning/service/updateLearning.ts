import { getCategory } from "../../category/service";
import { getSubCategory } from "../../subCategory/service";
import Learning from "../model";
import { ILearning } from "../type";

const updateLearning = async (id: string, body: ILearning) => {
  const isCategoryExists = await getCategory({ name: body.category }, 1, 10);
  if (!isCategoryExists.length) {
    return { status: 400, data: null, message: "Category Not Valid." };
  }

  const isSubCategoryExists = await getSubCategory(
    { name: body.subCategory },
    1,
    10,
  );
  if (!isSubCategoryExists.length) {
    return { status: 400, data: null, message: "Sub Category Not Valid." };
  }

  const updatedLearning = await Learning.findByIdAndUpdate(
    id,
    { ...body },
    { new: true },
  );

  return { status: 200, data: updatedLearning, message: "Learning Updated." };
};

export default updateLearning;
