import { Request, Response, NextFunction } from "express";
import * as Service from "./../service";

const getSubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const page: number = req.params.page ? parseInt(req.params.page, 10) : 1;
  const limit: number = req.params.limit ? parseInt(req.params.limit, 10) : 10;

  try {
    const allSubCategory = await Service.getSubCategory({}, page, limit);
    res.status(200).json({
      status: 200,
      data: allSubCategory,
      message: "Successfully Users Retrieved",
    });
  } catch (e: any) {
    next(e);
  }
};

export default getSubCategory;
