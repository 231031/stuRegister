import express from 'express';
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
import { Activity } from './models/Activity.model.js';
import { Arractivity } from './models/Arractivity.model.js';
import { Eduterm } from './models/Eduterm.model.js';
import { Student } from './models/Student.model.js';
import { Scholarhistory } from './models/Scholarhistory.model.js';
import { Scholarship } from './models/Scholarship.model.js';

import { Eduhistory } from './models/Eduhistory.model.js';
import { Coursedetail } from './models/Coursedetail.model.js';
import { Sturegister } from './models/Sturegister.model.js';


async function syncModels() {
  try {
    await Course.sync({ force: false, alter: true });
    console.log('C synced successfully');

    await Teacher.sync({ force: false, alter: true });
    console.log('T synced successfully');

    await Eduterm.sync({ force: false, alter: true });
    console.log('Et synced successfully');

    await Activity.sync({ force: false, alter: true });
    console.log('A synced successfully');

    await Arractivity.sync({ force: false, alter: true });
    console.log('Aa synced successfully');

    await Student.sync({ force: false, alter: true });
    console.log('S synced successfully');

    await Scholarship.sync({ force: false, alter: true });
    console.log('ss synced successfully');

    await Faculty.sync({ force: false, alter: true });
    console.log('F synced successfully');

    await Department.sync({ force: false, alter: true });
    console.log('D synced successfully');

    await Availablecourse.sync({ force: false, alter: true });
    console.log('ac synced successfully');

    await Scholarhistory.sync({ force: false, alter: true });
    console.log('sh synced successfully');

    await Eduhistory.sync({ force: false, alter: true });
    console.log('E synced successfully');

    await Sturegister.sync({ force: false, alter: true });
    console.log('sr synced successfully');

    await Coursedetail.sync({ force: false, alter: true });
    console.log('cd synced successfully');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
}
syncModels();

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


