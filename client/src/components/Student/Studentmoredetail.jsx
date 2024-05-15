import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Headerstu from './Headerstu';
import { getSelCourse } from '../../helpers/stuhelper';

export default function Studentmoredetail() {

  const navigate = useNavigate();
  const location = useLocation();
  const [id, setId] = useState('');
  const [course, setCourse] = useState('');
  const [data, setData] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/student/login');
    }

    if (location.state) setId(location.state.course_id);
    else navigate('/student/mycourse');

    const [department_id, year, student_id] = token.split('-');
    setData({
      department_id: department_id,
      year: year,
      student_id: student_id,
    });
  }, []);

  useEffect(() => {
    const apiCourse = async () => {
      try {
        const res = await getSelCourse(id);
        setCourse(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (id) apiCourse();

  }, [id]);

  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <title>Stu | MoreDetail</title>
        </Helmet>
        <Headerstu data={data} />

        <div className='flex flex-col justify-start items-center bg-lowyellow h-[calc(100vh-40px)]'>
          {
            (course) ? (
                <div className='w-9/12'>
                  <div className='text-4xl text-bold mb-5 underline underline-offset-2 my-20 '>{course?.course_name}</div>
                  <div className='text-xl text-white p-5  rounded-2xl bg-greendark'>
                    {course?.description}
                  </div>
                </div>

            ) : (
              <div className='flex flex-col items-center my-20 h-screen'>
                <p className='font-bold text-red-800 italic text-xl'>Not Have Course Detail of This Course</p>
              </div>
            )
          }

        </div>

      </div>
    </HelmetProvider>
  )
}
