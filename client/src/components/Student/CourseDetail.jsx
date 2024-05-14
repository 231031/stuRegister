import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import Headerstu from './Headerstu';
import { getCourseDe } from '../../helpers/stuhelper';

export default function Detailcourse() {

  const navigate = useNavigate();
  const [data, setData] = useState('');
  const [course, setCourse] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/student/login');
    }
    const [department_id, year, student_id] = token.split('-');
    setData({
      department_id: department_id,
      year: year,
      student_id: student_id,
    });

    const apiCourse = async () => {
      try {
        const res = await getCourseDe();
        setCourse(res);
      } catch (error) {
        console.log(error);
      }
    };
    apiCourse();
  }, []);

  return (
    <HelmetProvider>
      <div>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <Helmet>
          <title>Stu | CourseDetail</title>
        </Helmet>
        <div className='fixed w-full'>
          <Headerstu data={data} />
        </div>
        <div className='flex flex-col justify-start items-center bg-lowyellow'>
          {
            (course.length > 0) ? (
              course.map((cList, index) => (
                <div className='w-9/12' key={index}>
                  <div className='text-4xl text-bold mb-5 underline underline-offset-2 my-20 '>{cList.course_name}</div>
                  <div className='text-xl text-white p-5  rounded-2xl bg-greendark'>
                    {cList.description}
                  </div>
                </div>
              ))

            ) : (
              <div className='flex flex-col items-center my-20 h-screen'>
                <p className='font-bold text-red-800 italic text-xl'>Not Have Available Course</p>
              </div>
            )
          }

        </div>
      </div>
    </HelmetProvider>
  )
}