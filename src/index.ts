import express, { Application, NextFunction, Request, Response } from "express";
import database from "./config/db";
require("dotenv").config();

const app: Application = express();

// MongoDB connection with retry
database();

app.use(express.json());

import userRoutes from "./service/user";
import authRoutes from "./service/auth";
import categoryRoute from "./service/category";
import subCategoryRoute from "./service/subCategory";
import learningRoute from "./service/learning"

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/category", categoryRoute);
app.use("/subCategory", subCategoryRoute);
app.use("/learning", learningRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
