import React, { useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Adminlogin() {

  const [key, setKey] = useState('');
  function handleSubmit() {

  }

  return (
    <HelmetProvider>
      <div className='container'>
        <Helmet>
            <title>A | Login</title>
        </Helmet>
        <h3>Admin Login</h3>
        <form onSubmit={(e)=>handleSubmit()}>
          <input className='border-2 border-blue-800' type='text' id='key' onChange={(e)=>setKey(e.target.value)}/>
        </form>
      </div>
    </HelmetProvider>
  )
}
