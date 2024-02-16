import express, { Application, NextFunction, Request, Response } from "express";
import { uuid } from "uuidv4";
import eventEmitter from "./eventt";
import cors from "cors";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { login } from "./service/auth/service";
require("dotenv").config();

const app: Application = express();
app.use(cors());
app.use(express.json());

eventEmitter.emit("LOGEVENT");

app.use(passport.initialize());

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_SECRET_ID || "",
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      // Code to handle user authentication and retrieval
      let loginInfo = null;
      const user = await findUser({ email: profile._json.email });
      if (!user.length) {
        await createUser({
          email: profile._json.email || "",
          name: profile._json.name || "",
          password: await hashPassword("profile._json.email"),
          picture: profile._json.picture || "",
        } as IUser);

        loginInfo = await login({
          email: profile._json.email,
          password: "p",
          thiredPartyLogin: true,
        });
      } else {
        loginInfo = await login({
          email: profile._json.email,
          password: "p",
          thiredPartyLogin: true,
        });
      }
      
      done(null, loginInfo);
    },
  ),
);

import userRoutes from "./service/user";
import authRoutes from "./service/auth";
import categoryRoute from "./service/category";
import subCategoryRoute from "./service/subCategory";
import learningRoute from "./service/learning";
import { createUser, findUser } from "./service/user/service";
import { IUser } from "./service/user/type";
import { hashPassword } from "./service/auth/bcrypt";

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
