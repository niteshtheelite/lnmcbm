import { Router } from "express";

import {
  authorizeRoles,
  isAuthenticatedUser,
} from "../middlewares/authMiddleware.js";
import {
  createSubject,
  deleteSubject,
  getSubjects,
  updateSubject,
} from "../controllers/subjectController.js";

const router = Router();

router
  .route("/createSubject")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createSubject);
router
  .route("/allSubject")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSubjects);
router
  .route("/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateSubject);
router
  .route("/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteSubject);

export default router;
