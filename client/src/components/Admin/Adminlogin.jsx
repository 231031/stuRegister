import React, { useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { login } from '../../helpers/adminHelper';

export default function Adminlogin() {

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
        toast.success(res.msg);
        localStorage.setItem('role', res.role);
        navigate('/admin/home');  
      }
    } catch (error) {
      toast.error('Login Failed!');
      console.log(error);
    }
  }

  return (
    <HelmetProvider>
      <div className='flex justify-center flex-col h-screen'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <Helmet>
            <title>A | Login</title>
        </Helmet>
        <h3 className='text-center py-5 text-3xl'>Admin Login</h3>
        <div className='flex justify-center'>
          <form onSubmit={(e)=>handleSubmit(e)}>
            <div className='flex flex-col w-96'>
            <input className='my-3 p-5 w-full h-16 rounded-full bg-gray-200' type='text' id='key' onChange={(e)=>setKey(e.target.value)}/>
              <div className='flex justify-center'>
                  <button type="submit" className="my-3 w-1/3 h-10 rounded-full bg-gray-500 text-white ">Login</button>
              </div>
            </div>
          </form>
        </div>
        
      </div>
    </HelmetProvider>
  )
}
