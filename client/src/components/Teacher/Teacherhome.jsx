import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Headerteacher from './Headerteacher';
import { getInfoTeacher } from '../../helpers/teacherHelper';

export default function Teacherhome() {

  const [data, setData] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to={'/teacher/login'} replace={true}></Navigate>
    }
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
    <HelmetProvider>
        <div>
          <Toaster position='top-center' reverseOrder={false}></Toaster>
          <Helmet>
              <title>T | Home</title>
          </Helmet>
          <Headerteacher data={data}/>
        </div>
    </HelmetProvider>
  )
}
