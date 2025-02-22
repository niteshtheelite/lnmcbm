import { Router } from "express";
import { login, register } from "../controllers/authController.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").get(login);

export default router;
