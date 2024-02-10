import { Request, Response, NextFunction } from "express";
import * as Service from "./../service";

const regenerateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.body.token;
    const refreshToken = req.body.refreshToken;

    if (!token || !refreshToken)
      return res.status(400).json({ status: 401, message: "Unauthorized" });

    const regenerateToken = await Service.regenerateToken(token, refreshToken);
    res.status(200).json(regenerateToken);
  } catch (e: any) {
    next(e);
  }
};

export default regenerateToken;
