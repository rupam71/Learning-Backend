import { NextFunction, Request, Response } from "express";
import { USERTYPE } from "../../user/type";

interface JwtPayload {
  _id: string;
  iat: number;
  exp: number;
}

export const adminRoute = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log({user:req.body.user.type})
    const userType = req.body.user.type;

    if (userType === USERTYPE.ADMIN) next();
    else return res.status(400).json({ status: 400, message: "This is admin protected route." });
  } catch (error) {
    return res.status(400).json({ status: 400, message: "This is admin protected route." });
  }
};
