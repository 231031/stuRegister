import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import profile from '../../assets/profile.png';
import edit from '../../assets/edit.png';
import Headerstu from './Headerstu';
import { getInfo } from '../../helpers/stuhelper';

export default function Studentpersonal() {

    const navigate = useNavigate();
    const [data, setData] = useState('');
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/student/login');
        }
        const [department_id, year, student_id] = token.split('-');
        
        const apiInfo = async() => {
        try {
            const res = await getInfo(student_id);
            setData(res);
        } catch (error) {
            console.log(error);
        }
        }
        if (student_id) apiInfo();
    }, []);

    function handleClick(e) {
      // handle save photo and get publicID and sent with data in form
    }

  return (
    <HelmetProvider>
      <div>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <Helmet>
            <title>Stu | EditPersonal</title>
        </Helmet>
        <Headerstu data={data}/>
        <div className='flex flex-row'>
          <div className='w-1/4 bg-slate-300 h-[calc(100vh-40px)] p-10'>
            <div className='flex justify-end m-0'>
              <button className='w-1/12 h-1/12' type='button' onClick={(e)=>handleClick(e.target.value)}>
                <img src={edit}/>
              </button>
            </div>
            <div className='flex flex-col items-center'>
              {/* save profile in cloudinary and save publicID in student model */}
              <img className='rounded-full w-1/2 h-1/2 border-2 border-sky' src={profile}/>
            </div>
            <div className='flex flex-row justify-between mt-10'>
                <p>Student ID</p>
                <p>{data?.student_id}</p>
              </div>
              <div className='flex flex-row justify-between'>
                <p>Year</p>
                <p>{data?.year}</p>
              </div>
              <div className='flex flex-row justify-between'>
                <p>Department</p>
                <p>{data?.department_id}</p>
              </div>
          </div>

          <div className='w-3/4 flex'>
             {/* formik form for fill information after first login */}
          </div>
        </div>
      </div>
    </HelmetProvider>
  )
}
