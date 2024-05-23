import { Router } from 'express';

import * as controller from '../controllers/studentController.js';

const router = Router();

// post insert
router.route("/login").post(controller.loginStudent);
router.route("/register/course").post(controller.registerCourse);
router.route("/register/scholarship").post(controller.registerScholar);
router.route("/register/activity").post(controller.registerActivity);
router.route("/evaluate").post(controller.evaActivity);

// post query
router.route('/info').post(controller.getInfo);

router.route('/getsturegister').post(controller.getStuRegister); // my course
router.route('/getsturegister/delete').post(controller.getStuRegisterDelete); // delete course
router.route('/getsturegister/update').post(controller.getStuRegisterChange); // change group
router.route('/getavailable').post(controller.getAvailableCourse); // add course
router.route('/getcoursede').post(controller.getCourseDe); // all course detail
router.route('/getselcourse').post(controller.getSelCourse); // more detail course

router.route('/getstuterm').post(controller.getStuTerm); // education
router.route('/getgpax').post(controller.getGpax); // gpax
router.route('/gettotalcredit').post(controller.getTotalCredit); // total credit

router.route('/getscholarship').post(controller.getScholar); // sholarship
router.route('/getstatusscholar').post(controller.getStatusScholar); // status scholar
router.route('/getavgscholar').post(controller.getAvgScholar); // advanced analysis -> avg gpax and hours of students who get scholar

router.route('/getactivity').post(controller.getActivity);
router.route('/getarractivity').post(controller.getArrActivity);
router.route('/getfacactivity').post(controller.getFacActivity); // num activity (advanced analysis)


// delete
router.route("/delete/course").delete(controller.delCourse);


// put
router.route("/update/password").put(controller.updatePassword);
router.route("/update/group").put(controller.changeGroup);
router.route("/registerinfo").put(controller.updateInfo);

// get
router.route("/getavgscholar").get(controller.getAvgScholar); // avg gapx and avg hours (advanced analysis)


export default router;