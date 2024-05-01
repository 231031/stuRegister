import express from 'express';
import { sequelize } from "./dbcon.js";
import router from './router/studentRouter.js';
import routerAdmin from './router/adminRouter.js';
import routerTeacher from './router/teacherRouter.js';
import routerOA from './router/oaRouter.js';
import routerAll from './router/allRouter.js';
import cors from 'cors';

import { Availablecourse } from './models/Avilablecourse.model.js';
import { Department } from './models/Department.model.js';
import { Course } from './models/Course.model.js';
import { Faculty } from './models/Faculty.model.js';
import { Teacher } from './models/Teacher.model.js';
import { Eduterm } from './models/Eduterm.model.js';
import { Student } from './models/Student.model.js';
import { Scholarhistory } from './models/Scholarhistory.model.js';
import { Scholarship } from './models/Scholarship.model.js';

import { Eduhistory } from './models/Eduhistory.model.js';
import { Coursedetail } from './models/Coursedetail.model.js';
import { Sturegister } from './models/Sturegister.model.js';

Course.sync({ force: false, alter: true }).then(() => {console.log('C synced successfully');})
.catch((error) => { console.error('Error syncing database:', error); });

Teacher.sync({ force: false, alter: true }).then(() => {console.log('T synced successfully');})
.catch((error) => { console.error('Error syncing database:', error); });

Eduterm.sync({ force: false, alter: true }).then(() => {console.log('Et synced successfully');})
.catch((error) => { console.error('Error syncing database:', error); });

Student.sync({ force: false, alter: true }).then(() => {console.log('S synced successfully');})
.catch((error) => { console.error('Error syncing database:', error); });  

Scholarship.sync({ force: false, alter: true }).then(() => {console.log('ss synced successfully');})
.catch((error) => { console.error('Error syncing database:', error); });

Faculty.sync({ force: false, alter: true }).then(() => {console.log('F synced successfully');})
.catch((error) => { console.error('Error syncing database:', error); });

Department.sync({ force: false, alter: true }).then(() => {console.log('D synced successfully');})
.catch((error) => { console.error('Error syncing database:', error); });

Availablecourse.sync({ force: false, alter: true }).then(() => {console.log('ac synced successfully');})
.catch((error) => { console.error('Error syncing database:', error); });

Scholarhistory.sync({ force: false, alter: true }).then(() => {console.log('sh synced successfully');})
.catch((error) => { console.error('Error syncing database:', error); });

Eduhistory.sync({ force: false, alter: true }).then(() => {console.log('E synced successfully');})
.catch((error) => { console.error('Error syncing database:', error); });

Sturegister.sync({ force: false, alter: true }).then(() => {console.log('sr synced successfully');})
.catch((error) => { console.error('Error syncing database:', error); });

Coursedetail.sync({ force: false, alter: true }).then(() => {console.log('cd synced successfully');})
.catch((error) => { console.error('Error syncing database:', error); });
// sequelize.sync({ force: false, alter: true })
//   .then(() => {
//     console.log('Database synced successfully');
//   })
//   .catch((error) => {
//     console.error('Error syncing database:', error);
//   });

const app = express();
app.use(cors());


const ENV = 'development';
const DOMAIN = ENV === 'development' ? 'localhost' : '';
const PORT = 6001;

// middleware
app.use(express.json());

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


