import { NextFunction, Request, Response } from "express";
import * as Service from "./../service";

const getSingleLearning = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id: string = req.params.id;

  try {
    const singleLearning = await Service.getSingleLearning(id);
    res.status(200).json({
      status: 200,
      data: singleLearning,
      message: "Successfully Learning Retrieved",
    });
  } catch (e: any) {
    next(e);
  }
};

export default getSingleLearning;
