import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Headerstu from './Headerstu';
import { getAvailableCourse, getStuRegister } from '../../helpers/stuhelper';
import sry from '../../assets/sry.png';
export default function Studentregiscourse() {

  const navigate = useNavigate();
  const [data, setData] = useState('');
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [available, setAvailable] = useState('');

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

    setDate(new Date().getDate());
    setMonth(new Date().getMonth());
  }, []);

  useEffect(() => {
      const apiCourse = async () => {
        try {
          if (month == 4 && date < 15) {
            const detail = await getAvailableCourse(data.department_id, data.year);
            setAvailable(detail); 
          } 
          // else {
          //   const res = await getStuRegister(data.department_id, data.year);
          //   setAvailable(res);
          // }
        } catch (error) {
            toast.error('Cannot Get Information');
            console.error(error);
        } 
      }
      if (data) apiCourse();
      console.log(available);
  }, [data]);

  function handleClick() {
    navigate('/student/courses')
  }

  return (
    <HelmetProvider>
      <div className='container '>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <Helmet>
            <title>Stu | RegisterCourse</title>
        </Helmet>
        <Headerstu data={data}/>
        {
          (month == 4 && date < 15) ? (
            <div>
              {/* form for register course from course detail in available*/}
              {/* elective select from department course of department_id eng social */}
              {/* out of this be compulsory */}
            </div>
          ) : (
            <div className='h-screen flex flex-col items-center justify-center'>
              <img src={sry} className='w-1/6'/>
              <p className='my-5'>Sorry, we're not in registration period</p>
              <button className='p-3 bg-slate-400 text-white rounded-md' type='button' onClick={(e)=>handleClick()}>Preview Course Detail</button>
            </div>
          )
        }
        
      </div>
    </HelmetProvider>
  )
}
