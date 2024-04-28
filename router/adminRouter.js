import { Router } from 'express';

import * as controller from '../controllers/adminController.js';

const router = Router();


// get


// post
// query
router.route("/getdeteacher").post(controller.getDeTeacher);
router.route("/getdeinfac").post(controller.getDeInFac);

// insert
router.route("/addcourse").post(controller.addCourse);
router.route("/adddetail").post(controller.addDetail);
router.route("/addstudent").post(controller.addStudent);
router.route("/addteacher").post(controller.addTeacher);
router.route("/addfaculty").post(controller.addFaculty);
router.route("/adddepartment").post(controller.addDepartment);
router.route("/addavailable").post(controller.addAvailableCourse);

// update
router.route("/editcourse").put(controller.editCourse);

export default router;