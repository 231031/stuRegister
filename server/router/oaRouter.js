import { Router } from 'express';

import * as controller from '../controllers/comController.js';

const router = Router();



// path committee


// get
router.route('/getavgf').get(controller.getAvgF);
router.route('/getavgm').get(controller.getAvgM);



// post
// query
router.route('/login').post(controller.login);
router.route('/getapplicant').post(controller.getApplicant);
router.route('/getscholarhis').post(controller.getScholarHis);
router.route('/getstudent').post(controller.getStudent);
router.route('/getcountfaculty').post(controller.getCountFaculty);


// put
router.route('/update').put(controller.updateCheck);



export default router;
