import { Request, Response, NextFunction } from "express";
import * as Service from "./../service";

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const name: string = req.body.name;

  try {
    if (!name) {
      res
        .status(400)
        .json({ status: 400, data: null, message: "Name Required" });
      return;
    }

    const category = await Service.createCategory(name);
    res.status(200).json(category);
  } catch (e: any) {
    next(e);
  }
};

export default createCategory;
