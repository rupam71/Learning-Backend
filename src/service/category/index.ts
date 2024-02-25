import express, { Router } from "express";
import * as Controller from "./controller";
import { verifyToken } from "../auth/middleware/varifyToken";
import { adminRoute } from "../auth/middleware/adminRoute";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router: Router = express.Router();

router.get("/", Controller.getCategory);
router.post(
  "/",
  verifyToken,
  adminRoute,
  upload.single("image"),
  Controller.createCategory,
);
router.patch("/:id", verifyToken, adminRoute, Controller.updateCategory);
router.delete("/:id", verifyToken, adminRoute, Controller.deleteCategory);

export default router;
