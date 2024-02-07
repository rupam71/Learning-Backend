import mongoose from "mongoose";
import app from "./../server";
import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createCategory } from "../service/category/service";

describe("Product", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
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
        const newCategory = await createCategory('Jambura')
        const {body, statusCode} = await supertest(app).get(`/category?_id=${newCategory.data?._id.toString()}`).expect(200);
        expect(statusCode).toBe(200)
        expect(newCategory.data?._id.toString()).toBe(body.data[0]._id.toString())
    });
    });
  });
});
