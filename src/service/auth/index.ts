import express, { Router } from "express";
import * as Controller from "./controller";
import { verifyToken } from "./middleware/varifyToken";
import passport from "passport";

const router: Router = express.Router();

router.post("/signup", Controller.signUp);
router.post("/login", Controller.login);
router.get("/me", verifyToken, Controller.me);
router.post("/regenerateToken", Controller.regenerateToken);

// Initiates the Google OAuth 2.0 authentication flow
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

// Callback URL for handling the OAuth 2.0 response
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // Successful authentication, redirect or handle the user as desired
    console.log({ req, res });
    const { token, refreshToken } = req.user as any;
    // res.send(req.user).status(200);
    res.redirect(
      `${process.env.CORS_ORIGIN}?token=${token}&refreshToken=${refreshToken})`,
    );
  },
);

// Logout route
router.get("/logout", (req, res) => {
  // req.logout({ keepSessionInfo: true }, () => {});
  res.redirect("/");
});

export default router;
