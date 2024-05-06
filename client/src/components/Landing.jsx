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

  function student() {
    navigate('/student/login');
  }
  return (
    <HelmetProvider>
      <div className='flex flex-col justify-center items-center h-screen w-full '>
        <Helmet>
          <title >Registration</title>
        </Helmet>
        <h2 className='text-4xl text-bold '>Registration System</h2>
        <div className='flex flex-row justify-center mt-14'>
          <Btn>
            <FontAwesomeIcon onClick={(e)=>admin()}
            className='size-20 mx-8 p-10 rounded-full bg-orange-300 cursor-pointer hover:bg-orange-500' icon="fa-solid fa-user-tie " />
            <p className='mt-4 text-orange-800 text-2xl '>Admin</p>
          </Btn>
          <Btn>
            <FontAwesomeIcon onClick={(e)=>teacher()}
            className='size-20 mx-8 p-10 rounded-full bg-blue-300 cursor-pointer hover:bg-blue-500' icon="fa-solid fa-person-chalkboard" />
            <p className='mt-4 text-blue-800 text-2xl'>Teacher</p>
          </Btn>
          <Btn>
            <FontAwesomeIcon onClick={(e)=>student()}
            className='size-20 mx-8 p-10 rounded-full bg-lime-300 cursor-pointer hover:bg-lime-500 ' icon="fa-solid fa-user-graduate" />
            <p className='mt-4 text-lime-800 text-2xl '>Student</p>
          </Btn>
          
        </div>
      </div>
    </HelmetProvider>
    
  )
}
