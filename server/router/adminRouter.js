import { Router } from 'express';

import * as controller from '../controllers/adminController.js';

const router = Router();


// get


// post
// query
router.route("/getdeteacher").post(controller.getDeTeacher);
router.route("/getdeteacherac").post(controller.getDeTeacherAc);
router.route("/getdestudent").post(controller.getDeStudent);
router.route("/getdeinfac").post(controller.getDeInFac);
router.route('/login').post(controller.login);
router.route('/getstudent').post(controller.getInfoStudent);
router.route('/getteacher').post(controller.getInfoTeacher);

// insert
router.route("/addcourse").post(controller.addCourse);
router.route("/adddetail").post(controller.addDetail);
router.route("/addstudent").post(controller.addStudent);
router.route("/addteacher").post(controller.addTeacher);
router.route("/addfaculty").post(controller.addFaculty);
router.route("/adddepartment").post(controller.addDepartment);
router.route("/addscholarship").post(controller.addScholarship);
router.route("/addactivity").post(controller.addActivity);
router.route("/addavailable").post(controller.addAvailableCourse);

// update
router.route("/editcourse").put(controller.editCourse);
router.route("/update/infostu").put(controller.updateInfoStu);
router.route("/update/infoteacher").put(controller.updateInfoTeacher);

router.route("/notactive/teacher").put(controller.delTeacher);
router.route("/notactive/course").put(controller.delCourse);
router.route("/notactive/student").put(controller.delStudent);

export default router;