import * as UserService from "../../user/service";
import { IUser } from "../../user/type";

const me = async (_id: string) => {
  const user: IUser[] = await UserService.findUser({ _id });
  if (Array.isArray(user) && !user.length) return { status: 401, data: null, message: `User Not Valid` };

  return { status: 200, data: user[0], message: `Successfull` };
};

export default me;
