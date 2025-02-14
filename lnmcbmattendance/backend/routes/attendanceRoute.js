import { Router } from "express";
import {
  createAttendance,
  getAttendancePercentage,
} from "../controllers/attendanceController.js";

const router = Router();

router.route("/createAttendance").post(createAttendance);
router.route("/getAttendancePercentage").get(getAttendancePercentage);
// router.route("/allSection").get(getSections);
// router.route("/:id").get(getSectionById);
// router.route("/:id").put(updateSection);
// router.route("/:id").delete(deleteSection);

export default router;
