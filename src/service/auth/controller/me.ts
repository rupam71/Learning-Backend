import { Request, Response, NextFunction } from "express";
import * as Service from "./../service";

const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = req.body.user._id;

    const me = await Service.me(_id);
    res.status(200).json(me);
  } catch (e: any) {
    next(e);
  }
};

export default me;
