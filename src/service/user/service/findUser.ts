import User from "../model";
import { IUser } from "../type";

const findUser = async (body: any) => {
  try {
    const user: IUser[] = await User.find(body); // select('+password')

    return user;
  } catch (error: any) {
    //return { status: 400, data: null, message: error.message };
    console.log({ error });
    return [];
  }
};

export default findUser;
