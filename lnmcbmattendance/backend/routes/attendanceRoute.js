import { Router } from "express";
import {
  createAttendance,
  getAttendancePercentage,
  getAttendanceReport,
  getFilteredAttendance,
  getFilteredAttendanceByName,
  getStudentAttendance,
} from "../controllers/attendanceController.js";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "../middlewares/authMiddleware.js";

const router = Router();

router
  .route("/createAttendance")
  .post(
    isAuthenticatedUser,
    authorizeRoles("admin", "teacher"),
    createAttendance
  );
router.route("/getAttendancePercentage").get(getAttendancePercentage);
router.route("/students").get(getStudentAttendance);

router.route("/:id").get(getAttendancePercentage);
router.route("/").get(
  // isAuthenticatedUser,
  // authorizeRoles("admin", "teacher"),
  getFilteredAttendance
);
router
  .route("/report")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin", "teacher"),
    getAttendanceReport
  );
router.route("/filterAttendanceByName").get(getFilteredAttendanceByName);

export default router;
