import { Request, Response, NextFunction } from "express";
import * as Service from "./../service";

const deleteSubCategory = async (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id;

  try {
    if (!id) {
      res.status(400).json({ status: 400, data: null, message: "ID Required" });
      return;
    }

    const subCategory = await Service.deleteSubCategory(id);
    res.status(200).json(subCategory);
  } catch (e: any) {
    res.status(400).json({ status: 400, message: e.message });
  }
};

export default deleteSubCategory;
