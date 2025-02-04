import { Router } from "express";

const router = Router();

router.route("/createCourse").post(C);
router.route("/allStudents").get(getStudents);
router.route("/:id").put(updateStudent);
router.route("/:id").delete(deleteStudent);

export default router;
