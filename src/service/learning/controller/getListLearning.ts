import { NextFunction, Request, Response } from "express";
import * as Service from "./../service";

const getListLearning = async (req: Request, res: Response, next: NextFunction) => {
  const page: number = req.params.page ? parseInt(req.params.page, 10) : 1;
  const limit: number = req.params.limit ? parseInt(req.params.limit, 10) : 10;
  const category = req.params.category || "";
  const subCategory = req.params.subCategory || "";
  const search = req.params.search || "";

  try {
    const allLearning = await Service.getListLearning(page, limit, category, subCategory, search);
    res.status(200).json({ status: 200, data: allLearning, message: "Successfully Learning Retrieved" });
  } catch (e: any) {
    res.status(400).json({ status: 400, message: e.message });
  }
};

export default getListLearning;
