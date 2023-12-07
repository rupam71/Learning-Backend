import { Request, Response, NextFunction } from "express";
import * as Service from "./../service";

const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id;

  try {
    if (!id) {
      res.status(400).json({ status: 400, data: null, message: "ID Required" });
      return;
    }

    const category = await Service.deleteCategory(id);
    res.status(200).json(category);
  } catch (e: any) {
    res.status(400).json({ status: 400, message: e.message });
  }
};

export default deleteCategory;
