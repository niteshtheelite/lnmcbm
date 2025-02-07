import { Router } from "express";
import {
  createSection,
  deleteSection,
  getSectionById,
  getSections,
  updateSection,
} from "../controllers/sectionController.js";

const router = Router();

router.route("/createSection").post(createSection);
router.route("/allSection").get(getSections);
router.route("/:id").get(getSectionById);
router.route("/:id").put(updateSection);
router.route("/:id").delete(deleteSection);

export default router;
