import { Request, Response, NextFunction } from "express";
import * as Service from "./../service";
import sendValidationError from "../../../utils/sendValidationError";
import { ISignUp } from "../type";

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, mobile, password } = req.body as ISignUp;

  try {
    if (!email && !mobile) return sendValidationError(res, "Email or Phone Number");
    if (!password) return sendValidationError(res, "Password");
    if (email && !email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) return sendValidationError(res, "Email", "Email not valid");
    if (password.length < 7) return sendValidationError(res, "Email", "Password should be more than 6 character.");

    const login = await Service.login({ email, mobile, password });
    res.status(200).json(login);
  } catch (e: any) {
    next(e);
  }
};

export default login;
