import { Router } from 'express';

import * as controller from '../controllers/studentController.js';

const router = Router();

// post insert
router.route("/register").post(controller.registerStudent);
router.route("/login").post(controller.loginStudent);
router.route("/register/course").post(controller.registerCourse);
// post query
router.route('/info').post(controller.getInfo);



// put
router.route("/update").put(controller.updateStudent);

// get


export default router;