import * as UserService from "../../user/service";
import { IUser } from "../../user/type";
import { ISignUp } from "../type";

const signUp = async (user: ISignUp) => {
  if (user.email) {
    const userWithThisEmail = await UserService.findUser({ email: user.email });
    if (Array.isArray(userWithThisEmail) && userWithThisEmail.length)
      return { status: 400, data: null, message: "Email Already Used." };
  }
  if (user.mobile) {
    const userWithThisMobile = await UserService.findUser({
      mobile: user.mobile,
    });
    if (Array.isArray(userWithThisMobile) && userWithThisMobile.length)
      return { status: 400, data: null, message: "Phone Number Already Used." };
  }

  return await UserService.createUser(user as IUser).then((res) => {
    return res;
  });
};

export default signUp;
