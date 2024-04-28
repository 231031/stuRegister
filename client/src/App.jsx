import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import icon
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons';
library.add(fas, faTwitter, faFontAwesome );

// stu components
import Landing from'./components/Landing'; 
import Studentpersonal from'./components/Student/Studentpersonal'; 
import Studentlogin from'./components/Student/Studentlogin'; 
import Studenthome from'./components/Student/Studenthome'; 
import Studentupdate from'./components/Student/Studentupdate'; 


// admin components
import Courseregister from'./components/Admin/Courseregister'; 
import Coursedetail from'./components/Admin/Coursedetail'; 
import Courseedit from'./components/Courseedit'; 
import Coursetable from'./components/Admin/Coursetable'; 
import Admintablefac from'./components/Admin/Admintablefac'; 
import Admintabledepart from'./components/Admin/Admintabledepart'; 
import Adminaddstu from'./components/Admin/Adminaddstu'; 
import Adminaddfac from'./components/Admin/Adminaddfac'; 
import Adminaddteacher from'./components/Admin/Adminaddteacher'; 
import Adminadddepart from'./components/Admin/Adminadddepart'; 
import Adminaddavailable from './components/Admin/Adminaddavailable';

// oa components
import Studentinfo from'./components/Studentinfo'; 

const router = createBrowserRouter(
  [
    {
      path: '/',
      element : <Landing></Landing>
    },
    {
      path: '/oa/students',
      element : <Studentinfo></Studentinfo>
    },
    {
      path: '/student/personal',
      element : <Studentpersonal></Studentpersonal>
    },
    {
      path: '/student/login',
      element : <Studentlogin></Studentlogin>
    },
    {
      path: '/student/home',
      element : <Studenthome></Studenthome>
    },
    {
      path: '/student/update',
      element : <Studentupdate/>
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
      path: '/admin/addstu',
      element : <Adminaddstu/>
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
      path: '/admin/addteacher',
      element : <Adminaddteacher/>
    },
    {
      path: '/admin/departments',
      element : <Admintabledepart/>
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
