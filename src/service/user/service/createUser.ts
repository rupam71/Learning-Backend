import User from "../model";
import { IUser } from "../type";

const createUser = async (body: IUser) => {
  try {
    const user = new User(body);
    await user.save();

    return { status: 200, data: user, message: "Category Created." };
  } catch (error: any) {
    return { status: 400, data: null, message: error.message };
  }
};

export default createUser;
