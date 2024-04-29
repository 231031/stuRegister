import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Studentregiscourse() {

  const [id, setId] =useState('');
  // useEffect(() => {
  //   setId(localStorage.getItem('token'));
  // }, [])

  return (
    <HelmetProvider>
      <div>
        <Helmet>
            <title>Stu | RegisterCourse</title>
        </Helmet>
      </div>
    </HelmetProvider>
  )
}
