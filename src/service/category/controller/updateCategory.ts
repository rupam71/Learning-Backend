import { Request, Response, NextFunction } from "express";
import * as Service from "./../service";

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id: string = req.params.id;
  const name: string = req.body.name;

  try {
    if (!id) {
      res.status(400).json({ status: 400, data: null, message: "ID Required" });
      return;
    }

    const category = await Service.updateCategory(id, name);
    res.status(200).json(category);
  } catch (e: any) {
    next(e);
  }
};

export default updateCategory;
