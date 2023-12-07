import SubCategory from "../model";

const findByName = async (name: string, category: string) => {
  const result = await SubCategory.find({ name, category });
  if (result.length) return result[0];
  else return null;
};

export default findByName;
