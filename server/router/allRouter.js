import { Router } from 'express';

import * as controller from '../controllers/controller.js';

const router = Router();

router.route("/courses").get(controller.getAllCourses);
router.route("/allcourseac").get(controller.getAllCourseAc);
router.route("/coursesde").get(controller.getAllCoursesDe);
router.route('/course/getdetail').post(controller.getCourse);

router.route("/faculty").get(controller.getAllFaculty);
router.route("/departments").get(controller.getAllDepartments);
router.route("/scholarships").get(controller.getAllScholarships);
router.route("/activitys").get(controller.getOpenActivitys);

router.route('/allteachertb').post(controller.getAllTeacherTb);

export default router;
