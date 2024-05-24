import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Headerstu from './Headerstu';
import imageU1_2 from '../../assets/course.jpg';
import image_3 from '../../assets/profile.png';
import selec_course from '../../assets/selec6.png';

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
        <div className='bg-white '>
          <div className=' flex flex-col justify-center bg-cover bg-right text-lowyellow ' style={{backgroundImage: `url(${selec_course})`}}>
            <div className=' pt-20 pb-3 font-extrabold text-4xl ml-40 mt-10 '>Published Classes</div>
            <div className=' text-xl mb-20 ml-40'>These classes are available to students.</div>
          </div>
          <div className='flex justify-center font-semibold'>
          <div className='flex flex-row flex-wrap w-10/12 '>
            {
              (course.length > 0) ? (
                course.map((cList, index) => (
                  <div key={index} className='h-60 w-96 my-10 mx-4 flex flex-col justify-end rounded-3xl bg-course ' >
                    <button 
                    onClick={(e)=>handleClick(cList.course_id)}
                    className='flex flex-col  w-100% bg-[#42272C] h-2/5 rounded-b-3xl text-md'>
                      <div className='text-white ml-4 mt-4 flex flex-row'>
                        <p className='mr-3'>{cList.course_id}</p>
                        <p className='text-sm text-red-200 font-light italic'>{cList.type}</p> 
                      </div>
                      <div className='text-white ml-4  mt-1.5'>
                        {cList.course_name} 
                      </div>
                    </button>
                  </div>
                ))
              ) : (
                      <p className='font-bold text-red-800 italic text-center my-10 mt-40'>You have no class available</p>
                  
              )
            }
          </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  )
}