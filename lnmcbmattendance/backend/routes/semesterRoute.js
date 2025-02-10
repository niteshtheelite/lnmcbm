import { Router } from "express";
import {
  createSemester,
  deleteSemester,
  getSemester,
  updateSemester,
} from "../controllers/semesterController.js";

const router = Router();

router.route("/createSemester").post(createSemester);
router.route("/allSemester").get(getSemester);
router.route("/:id").put(updateSemester);
router.route("/:id").delete(deleteSemester);

export default router;
