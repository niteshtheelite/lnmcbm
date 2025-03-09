import { Router } from "express";
import {
  forgetPassword,
  login,
  logout,
  register,
  resetPassword,
} from "../controllers/authController.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);

export default router;
