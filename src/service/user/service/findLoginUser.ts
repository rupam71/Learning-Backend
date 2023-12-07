import User from "../model";
import { IUser } from "../type";

const findLoginUser = async (body: any) => {
  try {
    const user: IUser[] = await User.find(body).select("+password");
    if (!user || !user.length) return null;

    return user[0];
  } catch (error: any) {
    console.log({ error });
    return null;
  }
};

export default findLoginUser;
