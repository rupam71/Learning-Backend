import express, { Router } from "express";
import * as Controller from "./controller";
import { verifyToken } from "../auth/middleware/varifyToken";
import { adminRoute } from "../auth/middleware/adminRoute";

const router: Router = express.Router();

router.get("/", Controller.getListLearning);
router.get("/:id", Controller.getSingleLearning);
router.post("/", verifyToken, adminRoute, Controller.createLearning);
router.patch("/:id", verifyToken, adminRoute, Controller.updateLearning);
router.delete("/:id", verifyToken, adminRoute, Controller.deleteLearning);

export default router;
