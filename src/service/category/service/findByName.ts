import Category from "./../model";

const findByName = async (name: string) => {
  const result = await Category.find({ name });
  if (result.length) return result[0];
  else return null;
};

export default findByName;
