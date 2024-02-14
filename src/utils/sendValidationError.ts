import { Response } from "express";

const sendValidationError = (
  res: Response,
  fieldName: string,
  message: string = "",
) => {
  return res.status(400).json({
    status: 400,
    data: null,
    message: message || `${fieldName} Required`,
  });
};

export default sendValidationError;
