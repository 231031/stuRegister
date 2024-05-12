import { Router } from 'express';

import * as controller from '../controllers/comController.js';

const router = Router();



// path committee

// post
// query
router.route('/getapplicant').post(controller.getApplicant);
router.route('/getscholarhis').post(controller.getScholarHis);
router.route('/getstudent').post(controller.getStudent);

// put
router.route('/update').put(controller.updateCheck);



export default router;
