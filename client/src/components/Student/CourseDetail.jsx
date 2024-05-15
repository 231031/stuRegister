import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import Headerstu from './Headerstu';
import imageU1_2 from '../../assets/course.jpg';
import image_3 from '../../assets/profile.png';

export default function Detailcourse() {

    const navigate = useNavigate();
    const [data, setData] = useState('');
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
            <title>Stu | CourseDetail</title>
        </Helmet> 
        <Headerstu data={data}/>
        <div className='h-screen bg-lowyellow'>
        <div className='flex flex-row justify-start items-start space-x-10 px-20 font-semibold'>
          <div className='size-48 my-10 flex flex-col justify-end  rounded-3xl bg-contain ' style={{backgroundImage: `url(${imageU1_2})`}}>
              <button className='flex flex-col w-100% bg-lowbrown h-2/5 rounded-b-3xl '>
                <div className='text-white ml-4 mt-2'>
                  CPE : 232
                </div>
                <div className='text-white ml-4'>
                  Data Models
                </div>
              </button>
          </div>
          <div className='size-48 my-10 flex flex-col justify-end rounded-3xl bg-contain' style={{backgroundImage: `url(${imageU1_2})`}}>
              <button className='flex flex-col w-100% bg-lowbrown h-2/5 rounded-b-3xl'>
                <div className='text-white ml-4 mt-2'>
                  CPE : 232
                </div>
                <div className='text-white ml-4'>
                  Data Models
                </div>
              </button>
          </div>
          <div className='size-48 my-10 flex flex-col justify-end  rounded-3xl bg-contain' style={{backgroundImage: `url(${imageU1_2})`}}>
              <button className='flex flex-col w-100% bg-lowbrown h-2/5 rounded-b-3xl'>
                <div className='text-white ml-4 mt-2'>
                  CPE : 232
                </div>
                <div className='text-white ml-4 '>
                  Data Models
                </div>
              </button>
          </div>
        </div>
      </div>
      </div>
    </HelmetProvider>
  )
}