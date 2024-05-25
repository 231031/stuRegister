import React, { useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { login } from '../../helpers/comHelper';

export default function Committeelogin() {

  const navigate = useNavigate();
  const [key, setKey] = useState('');
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await login(key);
      if (res.error) {
        toast.error(res.error);
      } 
      else {
        localStorage.setItem('role', res.role);
        navigate('/committee/home');  
        toast.success(res.msg);
      }
    } catch (error) {
      toast.error('Login Failed!');
      console.log(error);
    }
  }

  return (
    <HelmetProvider>
      <div className='flex justify-center flex-col h-screen bg-darkgreen items-center'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <Helmet>
            <title>C | Login</title>
        </Helmet>
        <div className='flex justify-center  bg-sky rounded-xl p-10'>
          
          <form onSubmit={(e)=>handleSubmit(e)}>
          <div className='text-4xl flex justify-center mb-4 text-darkgreen '>Committee Login</div>
            <div className='flex flex-col w-96'>

            <input className='my-3 p-5 w-full h-16 rounded-xl bg-white hover:placeholder:text-slate-50 hover:outline-none hover:ring hover:bg-darkgreen hover:ring-darkgreen
            focus:outline-none focus:ring focus:bg-gray-50 focus:ring-darkgreen focus:placeholder:text-gray-500' type='text' id='key' placeholder='Id Key' onChange={(e)=>setKey(e.target.value)}/>
              <div className='flex justify-center'>
                  <button type="submit" className="my-3 w-1/3 h-10 rounded-xl hover:bg-lowyellow hover:text-darkgreen text-lowyellow bg-darkgreen">Login</button>
              </div>
            </div>
          </form>
        </div>
        
      </div>
    </HelmetProvider>
  )
}
