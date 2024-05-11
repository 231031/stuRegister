import { Router } from 'express';

import * as controller from '../controllers/teacherController.js';

const router = Router();

// post
// insert
router.route('/login').post(controller.loginTeacher);
router.route('/info').post(controller.getInfo);
// query
router.route('/course/getstudent').post(controller.getStuTeacher);
router.route('/course/getcourse').post(controller.getCourseTeacher);


// get

// put
router.route("/updatepass").put(controller.updatePassword);
router.route("/updategrade").put(controller.updateGrade);
router.route("/update").put(controller.updateTeacher);

export default router;