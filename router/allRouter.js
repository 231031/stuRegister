import { Router } from 'express';

import * as controller from '../controllers/controller.js';

const router = Router();

router.route("/courses").get(controller.getAllCourses);
router.route("/coursesde").get(controller.getAllCoursesDe);

export default router;
