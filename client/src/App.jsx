import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import icon
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons';
library.add(fas, faTwitter, faFontAwesome );

// teacher components
import Teacherlogin from './components/Teacher/Teacherlogin';
import Teachernewpass from './components/Teacher/Teachernewpass';
import Teacherpersonal from './components/Teacher/Teacherpersonal';
import Teacherhome from './components/Teacher/Teacherhome';
import Teachertablecourse from './components/Teacher/Teachertablecourse';

// stu components
import Landing from'./components/Landing'; 
import Studentpersonal from'./components/Student/Studentpersonal'; 
import Studentlogin from'./components/Student/Studentlogin'; 
import Studenthome from'./components/Student/Studenthome'; 
import Studentupdate from'./components/Student/Studentupdate'; 
import Studentnewpass from'./components/Student/Studentnewpass'; 
import Studentregiscourse from'./components/Student/Studentregiscourse'; 
import Studentregiselective from'./components/Student/Studentregiselective'; 
import Studentmycourse from'./components/Student/Studentmycourse'; 
import Studentscholar from './components/Student/Studentscholar';
import Studenteditpersonal from './components/Student/Studenteditpersonal';
import Studentaddeduhis from './components/Student/Studentaddeduhis';
import Detailcourse from './components/Student/CourseDetail';
import AllActivity from './components/Student/StudentallAc';
import AttendedActivity from './components/Student/StudentAtten';
import EvaluateActivity from './components/Student/StudentEvaActivity';
import Scholarform from './components/Student/StudentScholarform'; 

// -----scholar page----
import SCLM1 from './components/Student/StudentscholarLM1';
import SCLM2 from './components/Student/StudentscholarLM2';
import SCLM3 from './components/Student/StudentscholarLM3';

// admin components
import AdminLogin from './components/Admin/Adminlogin';
import Adminhome from './components/Admin/Adminhome';
import Courseregister from'./components/Admin/Courseregister'; 
import Coursedetail from'./components/Admin/Coursedetail'; 
import Courseedit from'./components/Courseedit'; 
import Coursetable from'./components/Admin/Coursetable'; 
import Admintablefac from'./components/Admin/Admintablefac'; 
import Admintabledepart from'./components/Admin/Admintabledepart'; 
import Admintablescholarstu from'./components/Admin/Admintablescholarstu'; 
import Adminaddstu from'./components/Admin/Adminaddstu'; 
import Adminaddfac from'./components/Admin/Adminaddfac'; 
import Adminaddteacher from'./components/Admin/Adminaddteacher'; 
import Adminadddepart from'./components/Admin/Adminadddepart'; 
import Adminaddscholar from './components/Admin/Adminaddscholar';
import Adminaddavailable from './components/Admin/Adminaddavailable';
import Studentinfo from'./components/Admin/Studentinfo';


const router = createBrowserRouter(
  [
    {
      path: '/',
      element : <Landing></Landing>
    },
    {
      path: '/teacher/login',
      element : <Teacherlogin/>
    },
    {
      path: '/teacher/newpassword',
      element : <Teachernewpass/>
    },
    {
      path: '/teacher/personal',
      element : <Teacherpersonal/>
    },
    {
      path: '/teacher/home',
      element : <Teacherhome/>
    },
    {
      path: '/teacher/selcourse',
      element : <Teachertablecourse/>
    },


    {
      path: '/student/login',
      element : <Studentlogin/>
    },
    {
      path: '/student/newpassword',
      element : <Studentnewpass/>
    },
    {
      path: '/student/personal',
      element : <Studentpersonal/>
    },
    {
      path: '/student/editpersonal',
      element : <Studenteditpersonal/>
    },
    {
      path: '/student/home',
      element : <Studenthome/>
    },
    {
      path: '/student/update',
      element : <Studentupdate/>
    },
    {
      path: '/student/regiscourse',
      element : <Studentregiscourse/>
    },
    {
      path: '/student/regiselective',
      element : <Studentregiselective/>
    },
    {
      path: '/student/mycourse',
      element : <Studentmycourse/>
    }, 
    {
      path: '/student/scholarship',
      element : <Studentscholar/>
    },
    {
      path: '/student/eduhis',
      element : <Studentaddeduhis/>
    },
    {
      path: '/student/courses',
      element : <Detailcourse/>
    },
    {
      path: '/student/activity',
      element : <AllActivity/>
    },
    {
      path: '/student/myactivity',
      element : <AttendedActivity/>
    },
    {
      path: '/student/evaluate',
      element : <EvaluateActivity/>
    },
    {
      path: '/student/StudentScholarform',
      element : <Scholarform/>
    },
    {
      path: '/student/StudentScholarLM1',
      element : <SCLM1/>
    },

    {
      path: '/student/StudentScholarLM2',
      element : <SCLM2/>
    },

    {
      path: '/student/StudentScholarLM3',
      element : <SCLM3/>
    },

    {
      path: '/admin/login',
      element : <AdminLogin/>
    },
    {
      path: '/admin/home',
      element : <Adminhome/>
    },
    {
      path: '/admin/addcourse',
      element : <Courseregister/>
    },
    {
      path: '/admin/adddetail',
      element : <Coursedetail/>
    },
    {
      path: '/admin/editcourse',
      element : <Courseedit/>
    },
    {
      path: '/admin/selcourse',
      element : <Coursetable/>
    },

    {
      path: '/admin/addscholarship',
      element : <Adminaddscholar/>
    },
    {
      path: '/admin/selscholar',
      element : <Admintablescholarstu/>
    },

    {
      path: '/admin/addstu',
      element : <Adminaddstu/>
    },
    {
      path: '/admin/students',
      element : <Studentinfo/>
    },
    {
      path: '/admin/selstudent',
      element : <Studentinfo/>
    },
    
    {
      path: '/admin/addavailable',
      element : <Adminaddavailable/>
    },
    {
      path: '/admin/addfac',
      element : <Adminaddfac/>
    },
    {
      path: '/admin/selfac',
      element : <Admintablefac/>
    },
    {
      path: '/admin/adddepartment',
      element : <Adminadddepart/>
    },
    {
      path: '/admin/departments',
      element : <Admintabledepart/>
    },

    {
      path: '/admin/addteacher',
      element : <Adminaddteacher/>
    },

  ]
);

function App() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </main>
  )
}

export default App
