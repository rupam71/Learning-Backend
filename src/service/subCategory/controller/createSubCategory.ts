import { Request, Response, NextFunction } from "express";
import * as Service from "./../service";

const createSubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const name: string = req.body.name;
  const category: string = req.body.category;

  try {
    if (!name) {
      res
        .status(400)
        .json({ status: 400, data: null, message: "Name Required" });
      return;
    }
    if (!category) {
      res
        .status(400)
        .json({ status: 400, data: null, message: "Category Required" });
      return;
    }

    const subCategory = await Service.createSubCategory(name, category);
    res.status(200).json(subCategory);
  } catch (e: any) {
    next(e);
  }
};

export default createSubCategory;
