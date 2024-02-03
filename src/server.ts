import express, { Application, NextFunction, Request, Response } from "express";
import { uuid } from "uuidv4";
import eventEmitter from "./eventt";

const app: Application = express();
app.use(express.json());

eventEmitter.emit("LOGEVENT");

import userRoutes from "./service/user";
import authRoutes from "./service/auth";
import categoryRoute from "./service/category";
import subCategoryRoute from "./service/subCategory";
import learningRoute from "./service/learning";

app.use((req: Request, res: Response, next: NextFunction) => {
  req.headers["uuid"] = uuid();
  req.eventEmitter = eventEmitter;
  next();
});

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/category", categoryRoute);
app.use("/subCategory", subCategoryRoute);
app.use("/learning", learningRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const log = {
    uuid: req.headers.uuid,
    message: err.message,
    name: err.name,
    stack: err.stack,
  };
  
  eventEmitter.emit("LOGEVENT", log);
  res.status(500).send({ status: 400, message: "Something went wrong!" });
});

export default app;
