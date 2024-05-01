import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import Headerstu from './Headerstu';
import { getInfo } from '../../helpers/stuhelper';

export default function Studenthome() {
  
  const [data, setData] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to={'/student/login'} replace={true}></Navigate>
    }
    const apiInfo = async () => {
        try {
          const res = await getInfo(localStorage.getItem('token'));
          setData(res);

        } catch (error) {
            toast.error('Cannot Get Information');
            console.error(error);
        } 
    };
    apiInfo();
  }, []);

  return (
    <HelmetProvider>
      <div className='container'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <Helmet>
            <title>Stu | Home</title>
        </Helmet>
        <Headerstu data={data}/>
        <h1>home stu</h1>
      </div>
    </HelmetProvider>
    
  )
}
