import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import Headerstu from './Headerstu';

// <----img---->
import imageU1 from '../../assets/oxbridge.jpeg';
import imageU1_2 from '../../assets/a.jpg';




export default function SCLM1() {

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
            <title>Stu | All activity</title>
        </Helmet> 
        <Headerstu data={data}/>

        {/* <---section1----> */}
        <div className="bg-gray-50 flex items-center">
    <section className="bg-cover bg-center py-32 w-full mt-0" style={{backgroundImage: `url(${imageU1_2})`}}>

        <div className="container mx-auto text-left text-white" >
            <div className="flex items-center">
            <div className="container mx-auto text-left text-white" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
                <div className="w-1/2">
                    <h1 className="text-5xl font-medium mb-6" style={{color: 'white'}}>Oxbridge University</h1>
                    <p className="text-xl mb-12" style={{color: 'white'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
                    <a href="#" className="bg-indigo-500 text-white py-4 px-12 rounded-full hover:bg-indigo-600">Get start</a>
                </div>
                <div className="w-1/2 pl-16">
                </div>
                </div>
            </div>
        </div>
    </section>
</div>





    
        {/* <-----> */}
      </div>
    </HelmetProvider>
  )
}