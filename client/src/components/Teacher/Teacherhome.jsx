import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import tw from 'twin.macro';

import Headerteacher from './Headerteacher';
import { getInfoTeacher, getAvgCourse } from '../../helpers/teacherHelper';

const Box = tw.div`w-9/12 bg-slate-200 rounded-md mx-10 text-center`;

export default function Teacherhome() {

  const [data, setData] = useState('');
  const [course, setCourse] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return <Navigate to={'/teacher/login'} replace={true}></Navigate>
    }
    // fetch teacher and include course details of this teacher
    const apiInfo = async () => {
      try {
        const res = await getInfoTeacher(localStorage.getItem('token'));
        setData(res);

      } catch (error) {
        toast.error('Cannot Get Information');
        console.error(error);
      }
    };

    const apiCourse = async () => {
      try {
        const res = await getAvgCourse(localStorage.getItem('token'));
        setCourse(res);

      } catch (error) {
        toast.error('Cannot Get Information');
        console.error(error);
      }
    };
    apiCourse();
    apiInfo();
    
  }, []);



  return (
    <HelmetProvider>
      <div className=' h-screen'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <Helmet>
          <title>T | Home</title>
        </Helmet>
        <Headerteacher data={data} />
        <div className='flex flex-col items-center bg-slate-200 py-4'>
          <p className='my-2'>Teacher ID : {data?.teacher_id}</p>
          <p className='my-2'>Name :  {data?.first_name} {data?.last_name}</p>
          <p className='my-2'>Position : {data?.position}</p>
        </div>
        <div className='flex flex-row justify-center items-center h-96'>
          {
            (course.length > 0) ? (
              <Box className='flex flex-col items-center h-auto'>
                <p className='mt-3'>Responsible Course</p>
                <table className='my-2 table-fixed  w-11/12'>
                  <thead>
                    <tr>
                      <td>Course ID</td>
                      <td>Course Name</td>
                      <td>Group</td>
                      <td>Average Grade</td>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      course.map((cList, index) => (
                        <tr key={index} className='w-11/12 bg-blue-200 border-y-8 border-slate-200'>
                          <td className='py-1'>{cList.course_id}</td>
                          <td className='py-1'>{cList.course_name}</td>
                          <td className='py-1'>{cList.gr}</td>
                          <td className='py-1'>{cList.avg_grade}</td>
                        </tr>

                      ))
                    }
                  </tbody>
                </table>
              </Box>
            ) : (
              <Box className='h-5/6'>
                  <p className='mt-5'>No Responsible Course Right Now</p>
              </Box>
            )
          }
        </div>

      </div>
    </HelmetProvider>
  )
}
