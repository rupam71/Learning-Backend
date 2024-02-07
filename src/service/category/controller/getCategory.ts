import { Request, Response, NextFunction } from "express";
import * as Service from "./../service";

type Query = {
  _id?: string;
};

const getCategory = async (req: Request, res: Response, next: NextFunction) => {
  const page: number = req.params.page ? parseInt(req.params.page, 10) : 1;
  const limit: number = req.params.limit ? parseInt(req.params.limit, 10) : 10;

  const query: Query = {};
  if (req.params._id) query._id = req.params._id;

  try {
    const allCategory = await Service.getCategory(query, page, limit);
    res.status(200).json({ status: 200, data: allCategory, message: "Successfully Users Retrieved" });
  } catch (e: any) {
    res.status(400).json({ status: 400, message: e.message });
  }
};

export default getCategory;
