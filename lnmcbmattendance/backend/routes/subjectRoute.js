import { Router } from "express";

import {
  authorizeRoles,
  isAuthenticatedUser,
} from "../middlewares/authMiddleware.js";
import {
  createSubject,
  deleteSubject,
  getAllSubjects,
  getSubjectsByCourseAndSemester,
  updateSubject,
} from "../controllers/subjectController.js";

const router = Router();

router
  .route("/createSubject")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createSubject);
router
  .route("/getSubjectsByCourseAndSemester")
  .get(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    getSubjectsByCourseAndSemester
  );
router
  .route("/allSubject")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllSubjects);
router
  .route("/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateSubject);
router
  .route("/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteSubject);

export default router;
