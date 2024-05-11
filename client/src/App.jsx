import React, { act, Suspense } from 'react';
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
import Teacherscore from './components/Teacher/Teachersubmitscore';
import Teachercourse from './components/Teacher/Teachercourse_info';
import TeacherEditcourse from './components/Teacher/TeacherEditcourse';

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
import Studentdelcourse from './components/Student/Studentdelcourse';
import Studentchangegroup from './components/Student/Studentchangegroup';
import Studentscholar from './components/Student/Studentscholar';
import Studenteditpersonal from './components/Student/Studenteditpersonal';
import Studentaddeduhis from './components/Student/Studentaddeduhis';
import Detailcourse from './components/Student/CourseDetail';
import AllActivity from './components/Student/StudentallAc';
import AttendedActivity from './components/Student/StudentAtten';
import EvaluateActivity from './components/Student/StudentEvaActivity';
import Scholarform from './components/Student/StudentScholarform'; 
import EvaForm from './components/Student/StudentEvaActivityform';
import Studentregister from './components/Student/Studentregister';

// -----scholar page----
import SCLM1 from './components/Student/StudentscholarLM1';
import SCLM2 from './components/Student/StudentscholarLM2';
import SCLM3 from './components/Student/StudentscholarLM3';
// ----activity page----
import ACT1 from './components/Student/StudentAC1';
import ACT2 from './components/Student/StudentAC2';
import ACT3 from './components/Student/StudentAC3';
import ACT4 from './components/Student/StudentAC4';
import ACT5 from './components/Student/StudentAC5';
import ACT6 from './components/Student/StudentAC6';


// admin components
import AdminLogin from './components/Admin/Adminlogin';
import Adminhome from './components/Admin/Adminhome';
import Courseregister from'./components/Admin/Courseregister'; 
import Coursedetail from'./components/Admin/Coursedetail'; 
import Courseedit from'./components/Admin/Courseedit'; 
import Coursetable from'./components/Admin/Coursetable'; 
import Admintablefac from'./components/Admin/Admintablefac'; 
import Admintabledepart from'./components/Admin/Admintabledepart'; 
import Admintablescholarstu from'./components/Admin/Admintablescholarstu'; 
import Adminaddstu from'./components/Admin/Adminaddstu'; 
import Adminaddfac from'./components/Admin/Adminaddfac'; 
import Adminaddteacher from'./components/Admin/Adminaddteacher'; 
import Adminadddepart from'./components/Admin/Adminadddepart'; 
import Adminaddscholar from './components/Admin/Adminaddscholar';
import Adminaddactivity from './components/Admin/Adminaddactivity';
import Adminaddavailable from './components/Admin/Adminaddavailable';
import Admintableteach from './components/Admin/Admintableteach';
import Admintablestu from './components/Admin/Admintablestu';

// committee component
import Committeetable from './components/committe/Committeetable';
import Committeestu from './components/committe/Committeestu';
import Committeeeva from './components/committe/Committeeeva';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element : <Landing></Landing>
    },



    {
      path: '/committee/info',
      element : <Committeestu></Committeestu>
    },
    {
      path: '/committee/tablestu',
      element : <Committeetable></Committeetable>
    },
    {
      path: '/committee/evastu',
      element : <Committeeeva></Committeeeva>
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
      path: '/teacher/teacherscore',
      element : <Teacherscore/>
    },
    {
      path: '/teacher/teachercourse_info',
      element : <Teachercourse/>
    },
    {
      path: '/teacher/teacherEditcourse',
      element : <TeacherEditcourse/>
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

    // course
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
      path: '/student/delcourse',
      element : <Studentdelcourse/>
    }, 
    {
      path: '/student/changegroup',
      element : <Studentchangegroup/>
    }, 
    {
      path: '/student/courses',
      element : <Detailcourse/>
    },
    
    {
      path: '/student/register',
      element : <Studentregister/>
    },
    {
      path: '/student/eduhis',
      element : <Studentaddeduhis/>
    },
    
    // scholarship
    {
      path: '/student/scholarship',
      element : <Studentscholar/>
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

    // activity
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
      path: '/student/evaluateform',
      element : <EvaForm/>
    },

    // <---activity page--->

    {
      path: '/Student/StudentAC1',
      element : <ACT1/>
    },

    {
      path: '/Student/StudentAC2',
      element : <ACT2/>
    },

    {
      path: '/Student/StudentAC3',
      element : <ACT3/>
    },
    {
      path: '/Student/StudentAC4',
      element : <ACT4/>
    },
    {
      path: '/Student/StudentAC5',
      element : <ACT5/>
    },
    {
      path: '/Student/StudentAC6',
      element : <ACT6/>
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
      path: '/admin/addactivity',
      element : <Adminaddactivity/>
    },


    {
      path: '/admin/addstu',
      element : <Adminaddstu/>
    },
    {
      path: '/admin/selstudent',
      element : <Admintablestu/>
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
    {
      path: '/admin/selteacher',
      element : <Admintableteach/>
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
