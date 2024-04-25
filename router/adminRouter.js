import { Router } from 'express';

import * as controller from '../controllers/adminController.js';

const router = Router();


router.route("/addcourse").post(controller.addCourse);
router.route("/adddetail").post(controller.addDetail);

// update
router.route("/editcourse").put(controller.editCourse);

export default router;