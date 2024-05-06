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
export default function EvaForm() {

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


       


          
  




        

    
        
      </div>
    </HelmetProvider>
  )
}