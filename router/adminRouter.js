import { Router } from 'express';

import * as controller from '../controllers/adminController.js';

const router = Router();


router.route("/addcourse").post(controller.addCourse);
router.route("/adddetail").post(controller.addDetail);
router.route("/addstudent").post(controller.addStudent);
router.route("/addteacher").post(controller.addTeacher);
router.route("/addfaculty").post(controller.addFaculty);
router.route("/adddepartment").post(controller.addDepartment);

// update
router.route("/editcourse").put(controller.editCourse);

export default router;