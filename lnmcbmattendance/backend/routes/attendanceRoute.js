import { Router } from "express";
import {
  calculateAttendancePercentage,
  createAttendance,
  getAttendancePercentage,
} from "../controllers/attendanceController.js";
import { verifyTeacher } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/createAttendance").post(createAttendance);
router.route("/getAttendancePercentage").get(getAttendancePercentage);
router.route("/getper").get(calculateAttendancePercentage);
// router.route("/allSection").get(getSections);
// router.route("/:id").get(getSectionById);
// router.route("/:id").put(updateSection);
// router.route("/:id").delete(deleteSection);

export default router;
