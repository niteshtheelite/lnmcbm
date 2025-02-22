import { Router } from "express";
import {
  createStudent,
  deleteStudent,
  getFilterStudent,
  getStudentOnSelection,
  getStudents,
  promoteAllStudents,
  updateStudent,
} from "../controllers/studentController.js";
import {
  authMiddleware,
  roleMiddleware,
} from "../middlewares/authMiddleware.js";

const router = Router();

router
  .route("/createStudent", authMiddleware, roleMiddleware(["admin"]))
  .post(createStudent);
router.route("/allStudents").get(getStudents);
router.route("/filterStudent").get(getFilterStudent);
router.route("/selectStudents").get(getStudentOnSelection);
router.route("/:id").put(updateStudent);
router.route("/:id").delete(deleteStudent);
router.route("/promote").get(promoteAllStudents);

export default router;
