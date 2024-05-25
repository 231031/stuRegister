import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import tw from 'twin.macro';
import { useNavigate } from 'react-router-dom';

const Btn = tw.div`flex flex-col items-center text-xl text-center`;
export default function Landing() {
  const navigate = useNavigate();
  function admin() {
    navigate('/admin/login');
  }

  function teacher() {
    navigate('/teacher/login');
  }
  
  function committee() {
    navigate('/committee/login');
  }

  function student() {
    navigate('/student/login');
  }
  return (
    <HelmetProvider>
      <div className='flex flex-col justify-center bg-darkgreen items-center h-screen w-full '>
        <Helmet>
          <title >Registration</title>
        </Helmet>
        <h2 className='text-5xl font- text-lowyellow f mb-10'>Registration System | KMUTT</h2>
        <div className='flex flex-col items-center bg-slate-200 rounded-xl p-8 space-y-8'>
        
        <div className='flex flex-row justify-center '>
          <Btn>
            <FontAwesomeIcon onClick={(e)=>admin()}
            className='size-20 mx-8 p-10 rounded-full bg-orange-300 cursor-pointer hover:bg-orange-500' icon="fa-solid fa-user-gear " />
            <p className='mt-4 text-orange-800 text-2xl '>Admin</p>
          </Btn>
          <Btn>
            <FontAwesomeIcon onClick={(e)=>teacher()}
            className='size-20 mx-8 p-10 rounded-full bg-blue-300 cursor-pointer hover:bg-blue-500' icon="fa-solid fa-chalkboard-user" />
            <p className='mt-4 text-blue-800 text-2xl'>Teacher</p>
          </Btn>
          <Btn>
            <FontAwesomeIcon onClick={(e)=>committee()}
            className='size-20 mx-8 p-10 rounded-full bg-red-300 cursor-pointer hover:bg-red-500' icon="fa-solid fa-user-check" />
            <p className='mt-4 text-red-300 text-2xl'>Committee</p>
          </Btn>
          <Btn>
            <FontAwesomeIcon onClick={(e)=>student()}
            className='size-20 mx-8 p-10 rounded-full bg-lime-300 cursor-pointer hover:bg-lime-500 ' icon="fa-solid fa-user-graduate" />
            <p className='mt-4 text-lime-800 text-2xl '>Student</p>
          </Btn>
          
        </div>
        </div>
      </div>
    </HelmetProvider>
    
  )
}
