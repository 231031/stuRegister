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

        <div className='py-10 flex flex-col justify-start items-center bg-white h-screen'>
          {
            (course) ? (
                <div className='w-9/12 '>
                  <div className='text-4xl text-bold mb-5 underline underline-offset-2 my-20 '>{course?.course_name}</div>
                  <div className='flex flex-col bg-sky rounded-lg'>
                    <div className='flex justify-start text-xl p-4 font-semibold items-center'>
                      Description
                     </div>
                    <div className='text-lg text-black p-4  bg-slate-100 rounded-b-lg'>
                      {course?.description}
                    </div>
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
