import express from "express";
import {
  getMe,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/auth.controller.js";
import authenticate from "../middleware/authenticate.js";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";
import validate from "../middleware/validate.js";

const router = express.Router();

router.post("/register", registerValidator, validate, registerUser);

router.post("/login", loginValidator, validate, loginUser);

router.get("/me", authenticate, getMe);

router.post("/refresh-token", refreshAccessToken);

router.post("/logout", authenticate, logoutUser);

export default router;
