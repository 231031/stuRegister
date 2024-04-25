import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// stu components
import Landing from'./components/Landing'; 
import Studentregister from'./components/Studentregister'; 
import Studentlogin from'./components/Studentlogin'; 
import Studentupdate from'./components/Studentupdate'; 


// admin components
import Courseregister from'./components/Courseregister'; 
import Coursedetail from'./components/Coursedetail'; 
import Courseedit from'./components/Courseedit'; 
import Coursetable from'./components/Coursetable'; 

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
      path: '/student/register',
      element : <Studentregister></Studentregister>
    },
    {
      path: '/student/login',
      element : <Studentlogin></Studentlogin>
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
