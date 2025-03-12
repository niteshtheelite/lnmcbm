import { Router } from "express";
import {
  createAttendance,
  getAttendancePercentage,
  getAttendanceReport,
  getFilteredAttendance,
  getFilteredAttendanceByName,
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

router.route("/:id").get(getAttendancePercentage);
router
  .route("/filterAttendance")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin", "teacher"),
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

// router.route("/:id").get(getSectionById);
// router.route("/:id").put(updateSection);
// router.route("/:id").delete(deleteSection);

export default router;
