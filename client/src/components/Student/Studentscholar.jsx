import React, { useState, useEffect } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';


export default function Studentscholar() {

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
      <Helmet>
          <title>Stu | Scholarship</title>
      </Helmet>
      </div>
    </HelmetProvider>
  )
}
