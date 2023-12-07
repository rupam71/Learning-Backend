import { Request, Response, NextFunction } from "express";
import * as Service from "./../service";
import sendValidationError from "../../../utils/sendValidationError";
import { ISignUp } from "../type";
import { hashPassword } from "../bcrypt";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, mobile, country, password } = req.body as ISignUp;

  try {
    if (!name) return sendValidationError(res, "Name");
    if (!email && !mobile) return sendValidationError(res, "Email or Phone Number");
    if (!country) return sendValidationError(res, "Country");
    if (!password) return sendValidationError(res, "Password");
    if (email && !email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) return sendValidationError(res, "Email", "Email not valid");
    if (password.length < 7) return sendValidationError(res, "Email", "Password should be more than 6 character.");

    const hashedPassword = await hashPassword(password);

    const category = await Service.signUp({ name, email, mobile, country, password: hashedPassword });
    res.status(200).json(category);
  } catch (e: any) {
    res.status(400).json({ status: 400, message: e.message });
  }
};

export default signUp;
