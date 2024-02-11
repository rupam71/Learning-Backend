import Learning from "../model";

const getSingleLearning = async (id: string) => {
  try {
    const learning = await Learning.findById(id);

    if (!learning)
      return { status: 404, data: null, message: "Learning Not Found." };
    return learning;
  } catch (e) {
    throw new Error("Error while Paginating Users");
  }
};

export default getSingleLearning;
