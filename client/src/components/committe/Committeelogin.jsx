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
        navigate('/committee/tablestu');  
        toast.success(res.msg);
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
        <h3 className='text-center py-5 text-4xl text-bold'>Admin Login</h3>
        <div className='flex justify-center'>
          <form onSubmit={(e)=>handleSubmit(e)}>
            <div className='flex flex-col w-96'>
            <input className='my-3 p-5 w-full h-16 rounded-full 
            bg-gray-200 hover:outline-none hover:ring hover:bg-orange-500 hover:ring-orange-500 hover:placeholder:text-white
            focus:outline-none focus:ring focus:bg-gray-50 focus:ring-orange-500 focus:placeholder:text-gray-500 ' type='text' id='key' placeholder='Id Key' onChange={(e)=>setKey(e.target.value)}/>
              <div className='flex justify-center'>
                  <button type="submit" className="my-3 w-1/3 h-10 rounded-full hover:bg-orange-500 text-white bg-orange-800">Login</button>
              </div>
            </div>
          </form>
        </div>
        
      </div>
    </HelmetProvider>
  )
}
