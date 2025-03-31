import { Router } from "express";
import {
  createStudent,
  deleteStudent,
  getFilterStudent,
  getStudentOnSelection,
  getStudents,
  promoteAllStudents,
  updateStudent,
  upgradeStudentSemester,
} from "../controllers/studentController.js";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "../middlewares/authMiddleware.js";

const router = Router();

router
  .route("/createStudent")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createStudent);
router.route("/allStudents").get(getStudents);
router.route("/filterStudent").get(getFilterStudent);
router.route("/selectStudents").get(getStudentOnSelection);
router.route("/:id").put(updateStudent);
router.route("/:id").delete(deleteStudent);
router.route("/promote").patch(promoteAllStudents);
router.route("/:studentId/upgrade-semester").put(upgradeStudentSemester);

export default router;
