import { Request, Response, NextFunction } from "express";
import * as Service from "./../service";

const updateSubCategory = async (req: Request, res: Response, next: NextFunction) => {
  const id: string = req.params.id;
  const name: string = req.body.name;
  const category: string = req.body.category;

  try {
    if (!id) {
      res.status(400).json({ status: 400, data: null, message: "ID Required" });
      return;
    }
    if (!name) {
      res.status(400).json({ status: 400, data: null, message: "Name Required" });
      return;
    }
    if (!category) {
      res.status(400).json({ status: 400, data: null, message: "Category Required" });
      return;
    }

    const subCategory = await Service.updateSubCategory(id, name, category);
    res.status(200).json(subCategory);
  } catch (e: any) {
    res.status(400).json({ status: 400, message: e.message });
  }
};

export default updateSubCategory;
