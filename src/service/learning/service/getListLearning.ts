import Learning from "../model";

const getListLearning = async (page: number, limit: number, category: string, subCategory: string, search: string) => {
  try {
    const query: any = {};
    if (category) query.category = category;
    if (subCategory) query.subCategory = subCategory;

    const learningList = await Learning.find(query)
      .skip((page - 1) * limit)
      .limit(limit);
    return learningList;
  } catch (e) {
    throw new Error("Error while Paginating Users");
  }
};

export default getListLearning;
