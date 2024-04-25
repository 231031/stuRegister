import express from 'express';
import { sequelize } from "./dbcon.js";
import router from './router/studentRouter.js';
import routerAdmin from './router/adminRouter.js';
import routerTeacher from './router/teacherRouter.js';
import routerOA from './router/oaRouter.js';
import routerAll from './router/allRouter.js';
import cors from 'cors';

import { Course } from './models/Course.model.js';
import { Coursedetail } from './models/Coursedetail.model.js';
import { Student } from './models/Student.model.js';
import { Eduhistory } from './models/Eduhistory.model.js';
import { Sturegister } from './models/Sturegister.model.js';
import { Teacher } from './models/Teacher.model.js';
import { Project } from './models/Project.model.js';
import { Projectstu } from './models/Projectstu.model.js';
import { Projectteacher } from './models/Projectteacher.model.js';

Course.sync();
Teacher.sync();
Student.sync();
Eduhistory.sync();
Sturegister.sync();
Project.sync();
Projectstu.sync();
Projectteacher.sync();
Coursedetail.sync();

const app = express();
// sequelize.sync( )
// .then(() => {
//   console.log('sync database done');
// })
// .catch(error => {
//   console.log(error.message);
// });

const ENV = 'development';
const DOMAIN = ENV === 'development' ? 'localhost' : '';
const PORT = 6001;

// middleware
app.use(express.json());
app.use(cors());

app.use('/admin', routerAdmin);
app.use('/teacher', routerTeacher);
app.use('/student', router);
app.use('/oa', routerOA);
app.use('/', routerAll);

// app.get('/api', (req, res) => {
//   try {
//     await Course.create({ "course_id": 'cpe', "courseName":"hello"})
//     res.json(mockData);
//   } catch (err) {
//     res.status(500).json({error: err.message });
//   }
// });

app.post('/test', async (req, res) => {
  try {
    await Course.create({ "course_id": 'cpe', "courseName":"hello"});
    res.json({ msg: "ok"})
  } catch (err) {
    res.status(500).json({error: err.message });
  }
});

app.listen(PORT, function () {
  console.log("server is successfully running!");
});


