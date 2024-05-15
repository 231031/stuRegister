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
        <Headerstu data={data}/>
        <div className='h-screen bg-white '>
        <div className=''> 
          <div className='px-20 pt-20 pb-3 font-bold text-4xl'>Published Classes</div>
          <div className='px-20 text-xl'>These classes are available to students.</div>
        </div>
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