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
        <div className='flex flex-col justify-start items-center h-screen bg-lowyellow'>
          <div className='w-9/12'>
              <div className='text-4xl text-bold mb-5 underline underline-offset-2 my-20 '>CPE241 : Database System</div>
                <div className='bg-gray-50 text-xl text-white p-5  rounded-2xl bg-greendark'>
                  Lorem ipsum dolor sit amet consectetur adipisicing  
                  facere voluptatibus tempore. Accusantium, quaerat accusamus. Aspernatur nulla repellat vero soluta vel est quis voluptatem sit adipisci.
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime ipsa voluptate excepturi sit magnam atque, doloremque aperiam similique 
                  magni repellat et voluptatibus animi quae voluptates cupiditate dolorem qui ea numquam.
                </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  )
}