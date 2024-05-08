import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';


import Headerteacher from './Headerteacher';


// <----textdropdown----->






export default function Teachercourse() {

    

  const [data, setData] = useState('');
  const [course, setCourse] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to={'/teacher/login'} replace={true}></Navigate>
    }
    // fetch teacher and include course details of this teacher
    const apiInfo = async () => {
        try {
          const res = await getInfoTeacher(localStorage.getItem('token'));
          setData(res);

        } catch (error) {
            toast.error('Cannot Get Information');
            console.error(error);
        } 
    };
    apiInfo();
  }, []);


  return (
    <div>
      <HelmetProvider>
        <Headerteacher data={data}/>
      </HelmetProvider>


      {/* <----textheader----> */}
      <div className='container px-2 py-24 mx-auto'>
        <div id="feedbackModal" className="feedbackModal">
                <div className="modalContent">
                  <h1 class="text-center text-3xl font-semibold capitalize text-sky dark:text-sky lg:text-4xl">GEN111: Man and Ethic of Living</h1>
                  <h2 style={{ textAlign: 'center', marginTop: '0px' }}>KMUTT UNIVERSITY</h2>


                  <div className = 'container mt-3'>
                      <h1  class='text-center  text-gray-600 text-2xl  '>DESCRIPTION</h1><br />
                  </div>
                </div>
          </div>
        





      
      
      
      </div>
      
      
    </div>

  )
}
