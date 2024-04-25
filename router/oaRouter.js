import { Router } from 'express';

import * as controller from '../controllers/controller.js';

const router = Router();



// path officer
router.route("/students").get(controller.getAllStudents);


export default router;
