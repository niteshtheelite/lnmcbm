import { Router } from "express";
import { createStudent } from "../controllers/studentController.js";

const router = Router();

router.route("/createStudent").post(createStudent);

export default router;
