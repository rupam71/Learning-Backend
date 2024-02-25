import { Request, Response, NextFunction } from "express";
import * as Service from "./../service";
import S3Manager from "../../../utils/S3Manager";

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const name: string = req.body.name;
  const desciption: string = req.body.desciption;
  let image = "";
  const query: any = {};

  // console.log({name, desciption, image: req.file})
  // console.log({file: req})

  try {
    if (!name) {
      res
        .status(400)
        .json({ status: 400, data: null, message: "Name Required" });
      return;
    }

    if (name) query.name = name;
    if (desciption) query.desciption = desciption;

    if (req.file) {
      const s3Manager = new S3Manager();
      const result = await s3Manager.uploadFile(
        "learning-app-rupam71",
        `category-${req.body.name}-${Date.now()}.png`,
        req.file.buffer,
      );
      if (result) query.image = result;
    }

    const category = await Service.createCategory(query);
    res.status(200).json(category);
  } catch (e: any) {
    next(e);
  }
};

export default createCategory;
