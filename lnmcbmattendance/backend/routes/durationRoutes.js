import { Router } from "express";
import {
  createDuration,
  getDuration,
} from "../controllers/durationController.js";

const router = Router();

router.route("/createDuration").post(createDuration);
router.route("/allDuration").get(getDuration);

export default router;
