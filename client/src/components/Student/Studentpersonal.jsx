import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

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

  return (
    <HelmetProvider>
      <div>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <Helmet>
            <title>Stu | EditPersonal</title>
        </Helmet>
        <Headerstu data={data}/>
        <div>
            {/* display personal information and button for link to edit personal page */}
        </div>
      </div>
    </HelmetProvider>
  )
}
