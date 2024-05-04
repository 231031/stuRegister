import React, { useState, useEffect } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Headerstu from './Headerstu';
import imagee from '../../assets/sc1.png';


const firstcard = {
      text1: 'Free Scholarships For Every Bright Student In KMUTT !'

}


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
      <div className='container'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
      <Helmet>
          <title>Stu | Scholarship</title>
      </Helmet>
      <Headerstu data={data}/>
      {/* <h3>{firstcard.text1}</h3> */}
        {/* <img src={imagee}></img> */}



    <header>
    {/* <!-- Section Hero --> */}
    <div class="flex flex-row">
    <div class="container mx-auto px-5 mt-5 h-96 rounded-md flex items-center" style={{ backgroundImage: `url(${imagee})` }}>
      <div class="sm:ml-20 text-gray-40 text-center sm:text-left">
        <h1 class="text-5xl font-bol mb-4">
        Free Scholarships For Every Bright <br />
        Student In KMUTT ! 
        </h1>
        <h3>Get free scholarship for every level of education that every <br/>
        student who achieves for a bright future can get</h3>
        <p class="text-lg inline-block sm:block">The largest online community to rent saunas in Finland.</p>
        <button class="mt-8 px-4 py-2 bg-gray-600 rounded">Browse saunas</button>
      </div>
    </div>
    
    </div>
    
  </header>
  <div class="py-16 container mx-auto px-6 md:px-0">
    <section>
      <h1 class="text-3xl font-bold text-gray-600 mb-10"> News  Sholarships </h1>
      <div class="grid sm:grid-cols-3 gap-4 grid-cols-2">
        <div>
          <div class="bg-gray-300 h-44"></div>
          <h3 class="text-lg font-semibold text-gray-500 mt-2">Saunas in <span class="text-gray-700">Helsinki</span></h3>
        </div>
        <div>
          <div class="bg-gray-300 h-44"></div>
          <h3 class="text-lg font-semibold text-gray-500 mt-2">Saunas in <span class="text-gray-700">Rovaniemi</span></h3>
        </div>
        <div>
          <div class="bg-gray-300 h-44"></div>
          <h3 class="text-lg font-semibold text-gray-500 mt-2">Saunas in <span class="text-gray-700">Ruka</span></h3>
        </div>
      </div>
      <hr class="w-40 my-14 border-4 rounded-md sm:mx-0 mx-auto" />
    </section>
    </div>
      

      
      </div>
    </HelmetProvider>
  )
}
