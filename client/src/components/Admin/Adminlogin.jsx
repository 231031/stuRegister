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
      <div className='container'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <Helmet>
            <title>A | Login</title>
        </Helmet>
        <h3>Admin Login</h3>
        <form onSubmit={(e)=>handleSubmit(e)}>
          <input className='border-2 border-blue-800' type='text' id='key' onChange={(e)=>setKey(e.target.value)}/>
          <button type='submit'>SUBMIT</button>
        </form>
      </div>
    </HelmetProvider>
  )
}
