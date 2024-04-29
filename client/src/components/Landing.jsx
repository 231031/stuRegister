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
      <div className='container flex flex-col items-center bg-stone-300 h-screen w-full'>
        <Helmet>
          <title>Registration</title>
        </Helmet>
        <h2 className='mt-8 text-2xl'>Registration System</h2>
        <div className='flex flex-row justify-center mt-24'>
          <Btn>
            <FontAwesomeIcon onClick={(e)=>admin()}
            className='size-2/5 mx-8 bg-sky-600 p-4 border-4 rounded-md cursor-pointer hover:border-orange-800' icon="fa-solid fa-user-tie" />
            <p>Admin</p>
          </Btn>
          <Btn>
            <FontAwesomeIcon onClick={(e)=>teacher()}
            className='size-2/5 mx-8 bg-sky-600 p-4 border-4 rounded-md cursor-pointer hover:border-blue-800' icon="fa-solid fa-person-chalkboard" />
            <p>Teacher</p>
          </Btn>
          <Btn>
            <FontAwesomeIcon onClick={(e)=>student()}
            className='size-2/5 mx-8 bg-sky-600 p-4 border-4 rounded-md cursor-pointer hover:border-lime-800' icon="fa-solid fa-user-graduate" />
            <p>Student</p>
          </Btn>
          
        </div>
      </div>
    </HelmetProvider>
    
  )
}
