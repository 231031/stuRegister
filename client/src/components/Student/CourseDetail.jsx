import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Headerstu from './Headerstu';
import imageU1_2 from '../../assets/course.jpg';
import image_3 from '../../assets/profile.png';

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
  }, []);

  useEffect(() => {
    const apiCourse = async () => {
      try {
        const res = await getCourseDe();
        setCourse(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (data) apiCourse();
  }, [data]);

  function handleClick(id) {
    navigate('/student/moredetail', { state : { course_id : id }});
  }

  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <title>Stu | CourseDetail</title>
        </Helmet>
        <Headerstu data={data} />
        <div className='h-screen bg-white '>
          <div>
            <div className='px-20 pt-20 pb-3 font-bold text-4xl'>Published Classes</div>
            <div className='px-20 text-xl'>These classes are available to students.</div>
          </div>
          <div className='flex flex-row flex-wrap justify-start items-start space-x-10 px-20 font-semibold'>
            {
              (course.length > 0) ? (
                course.map((cList, index) => (
                  <div key={index} className='h-52 w-56 my-10 flex flex-col justify-end  rounded-3xl bg-contain ' style={{ backgroundImage: `url(${imageU1_2})` }}>
                    <button 
                    onClick={(e)=>handleClick(cList.course_id)}
                    className='flex flex-col w-100% bg-lowbrown h-2/5 rounded-b-3xl text-md '>
                      <div className='text-white ml-4 mt-2'>
                        {cList.course_id}
                      </div>
                      <div className='text-white ml-4'>
                        {cList.course_name}
                      </div>
                    </button>
                  </div>
                ))
              ) : (
                <p className='font-bold text-red-800 italic text-center my-10'></p>
              )
            }

          </div>
        </div>
      </div>
    </HelmetProvider>
  )
}