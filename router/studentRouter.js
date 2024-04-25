import { Router } from 'express';

import * as controller from '../controllers/studentController.js';

const router = Router();


router.route("/register").post(controller.registerStudent);
router.route("/login").post(controller.loginStudent);
router.route("/register/course").post(controller.registerCourse);

router.route("/update").put(controller.updateStudent);

// app.get("/students/:id", async function (req, res) {
//     const results = await myDataSource.getRepository(Student).findOneBy({
//         id: req.params.id,
//     })
//     return res.send(results)
// })

// app.post("/students", async function (req, res) {
//     const student = myDataSource.getRepository(Student).create(req.body)
//     const results = await myDataSource.getRepository(Student).save(student)
//     return res.send(results)
// })

export default router;