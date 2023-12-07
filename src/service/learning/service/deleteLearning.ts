import Learning from "../model";

const deleteLearning = async (id: string) => {
  const deletedLearning = await Learning.findByIdAndDelete(id);
  return { status: 200, data: deletedLearning, message: "Learning Deleted." };
};

export default deleteLearning;
