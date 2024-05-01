import { Router } from 'express';

import * as controller from '../controllers/teacherController.js';

const router = Router();

// post
router.route('/login').post(controller.loginTeacher);
router.route('/info').post(controller.getInfo);

// get
router.route("/updategrade").get(controller.updateGrade);

// put
router.route("/update").put(controller.updateTeacher);

export default router;