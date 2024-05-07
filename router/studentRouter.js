import { Router } from 'express';

import * as controller from '../controllers/studentController.js';

const router = Router();

// post insert
router.route("/login").post(controller.loginStudent);
router.route("/register/course").post(controller.registerCourse);
router.route("/register/scholarship").post(controller.registerScholar);
router.route("/register/activity").post(controller.registerActivity);
// post query
router.route('/info').post(controller.getInfo);
router.route('/getsturegister').post(controller.getStuRegister);
router.route('/getavailable').post(controller.getAvailableCourse);
router.route('/getscholarship').post(controller.getScholar);
router.route('/getactivity').post(controller.getActivity);


// put
router.route("/update").put(controller.updateStudent);

// get


export default router;