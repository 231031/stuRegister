import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

import Headerstu from './Headerstu';
import { useNavigate } from 'react-router-dom';


// <----text---->
const text_ACT1 = {
  intro: 'Are you passionate about making a positive impact in our community? Do you want to be part of a group dedicated to helping others and making a difference? If so, we invite you to join our Community Service Club!.',
  intro1: 'At our club, we believe in the power of service and giving back. We strive to create meaningful opportunities for members to volunteer, collaborate, and inspire change. Whether you are interested in environmental conservation, supporting local charities, or empowering underserved populations, there is a place for you here.',
  intro2: 'As a member of our club, you will have the chance to',
}

// <-----img----->
import img1 from '../../assets/AC4.jpg';
import img2 from '../../assets/Clean.jpeg';
import img3 from '../../assets/Garden.webp';
import img4 from '../../assets/pet.jpeg';


export default function ACT4() {

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
            <title>Stu | AC4</title>
        </Helmet>
        <Headerstu data={data}/>

        {/* <---section1---> */}
        <div class="container mx-auto px-6 py-16 text-center">
        <div class="mx-auto max-w-lg">
            <h1 class="text-3xl font-bold text-gray-800 dark:text-[#422006] lg:text-4xl">Community Service</h1>
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
    <section class="bg-white dark:bg-[#fffbeb]">
    <div class="container mx-auto px-6 py-10">
        <h1 class="text-center text-3xl font-semibold capitalize text-gray-800 dark:text-[#422006] lg:text-4xl">Activities and events in the club</h1>

        <p class="mt-4 text-center text-gray-500 text-gray-400">{text_ACT1.intro2}</p>

        <div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-12 xl:grid-cols-3 xl:gap-12">
        <div>
            <img class="h-96 w-full rounded-lg object-cover" src={img2} />
            <h2 class="mt-4 text-2xl font-semibold capitalize text-gray-800 dark:text-[#422006]">Clean-up Campaign</h2>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Public Space Beautification</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Trail Clean-Up</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Neighborhood Clean-Up</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Beach Clean-Up</p>
        </div>

        <div>
            <img class="h-96 w-full rounded-lg object-cover" src={img3} />
            <h2 class="mt-4 text-2xl font-semibold capitalize text-gray-800 dark:text-[#422006]">Community Garden</h2>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Garden Planning and Design</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Garden Bed Construction</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Harvest Celebrations</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Community Outreach</p>
        </div>

        <div>
            <img class="h-96 w-full rounded-lg object-cover" src={img4} />
            <h2 class="mt-4 text-2xl font-semibold capitalize text-gray-800 dark:text-[#422006]">Animal Shelter Volunteering</h2>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Animal Care and Socialization:</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Grooming and Bathing Sessions</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Animal Enrichment Activities</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Adoption Events</p>
        </div>
        </div>
    </div>
    </section>
        
      </div>
    </HelmetProvider>
  )
}