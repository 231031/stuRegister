import express from 'express';
import router from './router/studentRouter.js';
import routerAdmin from './router/adminRouter.js';
import routerTeacher from './router/teacherRouter.js';
import routerOA from './router/oaRouter.js';
import routerAll from './router/allRouter.js';
import cors from 'cors';

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
app.use('/committee', routerOA);
app.use('/', routerAll);


app.listen(PORT, function () {
  console.log("server is successfully running!");
});


