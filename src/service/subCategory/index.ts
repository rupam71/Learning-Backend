import express, { Router } from "express";
import * as Controller from "./controller";
import { adminRoute } from "../auth/middleware/adminRoute";
import { verifyToken } from "../auth/middleware/varifyToken";

const router: Router = express.Router();

router.get("/", Controller.getSubCategory);
router.post("/", verifyToken, adminRoute, Controller.createSubCategory);
router.patch("/:id", verifyToken, adminRoute, Controller.updateSubCategory);
router.delete("/:id", verifyToken, adminRoute, Controller.deleteSubCategory);

export default router;
