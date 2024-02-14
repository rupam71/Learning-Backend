import mongoose from "mongoose";
import app from "./../server";
import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createCategory } from "../service/category/service";
import { login } from "../service/auth/service";
import User from "../service/user/model";
import { hashPassword } from "../service/auth/bcrypt";
require("dotenv").config();

const userPayload = {
  email: "user@gmail.com",
  password: "1234567",
};
const categoryPayload = {
  name: "DevOps 06",
};

describe("Category", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
    const password = await hashPassword("1234567");
    await User.create({
      name: "ali",
      email: "user@gmail.com",
      password,
      country: "Ban",
      type: "admin",
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("CATEGORY TEST", () => {
    describe("given the category does not exists", () => {
      it("should return a 404", async () => {
        // expect(true).toBe(true);
        const categoryID = "category-123";
        await supertest(app).get(`/category/${categoryID}`).expect(404);
      });
    });

    describe("given the category does exists", () => {
      it("should return a 200", async () => {
        const newCategory = await createCategory("Jambura");
        const { body, statusCode } = await supertest(app)
          .get(`/category?_id=${newCategory.data?._id.toString()}`)
          .expect(200);
        expect(statusCode).toBe(200);
        expect(newCategory.data?._id.toString()).toBe(
          body.data[0]._id.toString(),
        );
      });
    });
  });

  describe("create category route", () => {
    describe("given the user is not logged in", () => {
      it("shouldd return 403", async () => {
        const { statusCode } = await supertest(app).post("/category");

        expect(statusCode).toBe(400);
      });
    });
    describe("given the user is logged in", () => {
      it("shouldd return 200 and create category", async () => {
        const { token } = await login(userPayload);

        const { statusCode, body } = await supertest(app)
          .post("/category")
          .set("authorization", token as string)
          .send(categoryPayload);

        expect(statusCode).toBe(200);
      });
    });
  });
});
