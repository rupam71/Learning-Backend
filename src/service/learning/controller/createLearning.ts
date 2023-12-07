import { NextFunction, Request, Response } from "express";
import sendValidationError from "../../../utils/sendValidationError";
import * as Service from "./../service";
import { ILearning } from "../type";

const createLearning = async (req: Request, res: Response, next: NextFunction) => {
  const { category, subCategory, title, description, command } = req.body as ILearning;

  try {
    if (!category) return sendValidationError(res, "Category");
    if (!subCategory) return sendValidationError(res, "Sub Category");
    if (!title) return sendValidationError(res, "Title");
    if (!description) return sendValidationError(res, "Description");
    if (!command) return sendValidationError(res, "Command");

    const learning = await Service.createLearning(req.body);
    res.status(200).json(learning);
  } catch (e: any) {
    res.status(400).json({ status: 400, message: e.message });
  }
};

export default createLearning;
