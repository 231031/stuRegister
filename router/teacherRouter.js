import { Router } from 'express';

import * as controller from '../controllers/teacherController.js';

const router = Router();


router.route("/updategrade").get(controller.updateGrade);

export default router;