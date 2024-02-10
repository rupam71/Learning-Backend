import express, { Router } from "express";
import { signUp, login, me, regenerateToken } from "./controller";
import { verifyToken } from "./middleware/varifyToken";
import { adminRoute } from "./middleware/adminRoute";

const router: Router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/me", verifyToken, me);
router.post("/regenerateToken", regenerateToken);

export default router;
