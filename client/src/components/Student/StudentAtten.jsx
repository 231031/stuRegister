import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Headerstu from './Headerstu';



const text = {
  intro : 'Do not Forget to Evaluate" Activity! As we embark on this journey of exploration and learning together, it is essential to reflect on our experiences and assess the impact of our activities. ',
}
export default function AttendedActivity() {

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
            <title>Stu | Attended Activity</title>
        </Helmet> 
        <Headerstu data={data}/>



        {/* <---section1----> */}


        <div class="h-[16rem] bg-gray-100 dark:bg-gray-800">
        <div class="container mx-auto px-6 py-10">
        <h1 class="text-center text-3xl font-semibold capitalize text-gray-800 dark:text-white lg:text-4xl">Attended Activity</h1>

        <div class="mx-auto mt-6 flex justify-center">
            <span class="inline-block h-1 w-40 rounded-full bg-blue-500"></span>
            <span class="mx-1 inline-block h-1 w-3 rounded-full bg-blue-500"></span>
            <span class="inline-block h-1 w-1 rounded-full bg-blue-500"></span>
        </div>

        <p class="mx-auto mt-6 max-w-2xl text-center text-gray-500 dark:text-gray-300">{text.intro}</p>
        </div>
    </div>

    
        
      </div>
    </HelmetProvider>
  )
}