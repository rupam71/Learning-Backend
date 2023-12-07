import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(400).json({ status: 400, message: "Token not found." });

    const decode: any = jwt.verify(token as string, process.env.JWT as string);

    if (decode._id) {
      req.body.user = decode;
      console.log({ req: req.body });
      next();
    } else {
      return res.status(400).json({ status: 400, message: "Unauthenticated" });
    }
  } catch (error) {
    return res.status(400).json({ status: 400, message: "Unauthenticated" });
  }
};
