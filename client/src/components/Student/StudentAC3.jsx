import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

import Headerstu from './Headerstu';
import { useNavigate } from 'react-router-dom';



// <----text---->
const text_ACT1 = {
  intro: 'Are you passionate about unleashing your artistic talents and exploring the depths of creativity? Look no further! We are thrilled to extend an invitation to you to join our Creative Arts Club.',
  intro1: 'No matter your skill level or background, everyone is welcome to join us and express themselves through art. So come on board and lets paint the town with creativity together!',
  intro2: 'Hello creative souls!',
}

// <-----img----->
import img1 from '../../assets/Art.jpeg';
import img2 from '../../assets/ARTpainting.png';
import img3 from '../../assets/ARTdraw.jpeg';
import img4 from '../../assets/ARTsculpture.jpeg';


export default function ACT3() {

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
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <Helmet>
            <title>Stu | AC3</title>
        </Helmet>
        <Headerstu data={data}/>


        {/* <---section1---> */}
        <div class="container mx-auto px-6 py-16 text-center">
        <div class="mx-auto max-w-lg">
            <h1 class="text-3xl font-bold text-gray-800 dark:text-[#431407] lg:text-4xl">Creative Arts</h1>
                <p class="mt-6 text-gray-500 dark:text-gray-400">{text_ACT1.intro}</p>
                    <button class="mt-6 rounded-lg bg-[#0d9488] px-6 py-2.5 text-center text-sm font-medium capitalize leading-5 text-white hover:bg-Slate focus:outline-none lg:mx-0 lg:w-auto">Accept</button>
                <p class="mt-3 text-sm text-gray-400">Let it fun! </p>
            </div>

            <div class="mt-10 flex justify-center">
            <img class="h-96 w-full rounded-xl object-cover lg:w-4/5" src={img1} />
            
        </div>
        <p class="mt-10 text-gray-500 dark:text-gray-400">{text_ACT1.intro1}</p>
    </div>

    {/* <-----section2-----> */}
    <section class="bg-white dark:bg-[#fff7ed]">
    <div class="container mx-auto px-6 py-10">
        <h1 class="text-center text-3xl font-semibold capitalize text-gray-800 dark:text-[#431407] lg:text-4xl">Activities and events in the club</h1>

        <p class="mt-4 text-center text-gray-500 text-gray-400">{text_ACT1.intro2}</p>

        <div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-12 xl:grid-cols-3 xl:gap-12">
        <div>
            <img class="h-96 w-full rounded-lg object-cover" src={img2} />
            <h2 class="mt-4 text-2xl font-semibold capitalize text-gray-800 dark:text-[#431407]">Painting art</h2>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Technique Workshops</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Outdoor Plein Air Painting</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Collaborative Projects</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Art Critiques and Feedback</p>
        </div>

        <div>
            <img class="h-96 w-full rounded-lg object-cover" src={img3} />
            <h2 class="mt-4 text-2xl font-semibold capitalize text-gray-800 dark:text-[#431407]">Drawing</h2>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Drawing Workshops</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Live Model Sessions</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Still Life Studies</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Outdoor Sketching Excursions</p>
        </div>

        <div>
            <img class="h-96 w-full rounded-lg object-cover" src={img4} />
            <h2 class="mt-4 text-2xl font-semibold capitalize text-gray-800 dark:text-[#431407]">Sculpture</h2>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Hands-on Sculpting Workshops</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Exploration of Sculpture Mediums</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Theme-Based Sculpture Projects</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Sculpture Garden Installations</p>
        </div>
        </div>
    </div>
    </section>
        
        
      </div>
    </HelmetProvider>
  )
}