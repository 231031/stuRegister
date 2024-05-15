import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import Headerstu from './Headerstu';

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
        <div className='h-screen bg-lowyellow'>
        <div className='flex flex-row justify-start items-start space-x-10 px-20 font-semibold'>
          <div className='size-48 my-10 flex flex-col justify-end bg-black rounded-3xl '>
              <button className='flex flex-col w-100% bg-red-500 h-2/5 rounded-b-3xl '>
                <div className='text-white ml-4 mt-2'>
                  CPE : 232
                </div>
                <div className='text-white ml-4'>
                  Data Models
                </div>
              </button>
          </div>
          <div className='size-48 my-10 flex flex-col justify-end bg-black rounded-3xl'>
              <button className='flex flex-col w-100% bg-red-500 h-2/5 rounded-b-3xl'>
                <div className='text-white ml-4 mt-2'>
                  CPE : 232
                </div>
                <div className='text-white ml-4'>
                  Data Models
                </div>
              </button>
          </div>
          <div className='size-48 my-10 flex flex-col justify-end bg-black rounded-3xl'>
              <button className='flex flex-col w-100% bg-blue-700 h-2/5 rounded-b-3xl'>
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