import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getCourses,
  updateCourse,
} from "../controllers/courseController.js";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "../middlewares/authMiddleware.js";

const router = Router();

router
  .route("/createCourse")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createCourse);
router.route("/allCourse").get(getCourses);
router.route("/:id").put(updateCourse);
router.route("/:id").delete(deleteCourse);

export default router;
