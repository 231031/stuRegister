import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

import Headerstu from './Headerstu';
import { useNavigate } from 'react-router-dom';


// <----text---->
const text_ACT1 = {
  intro: 'Are you passionate about technology and innovation? Do you thrive on exploring the latest advancements and sharing ideas with like-minded individuals? If so, we invite you to join our vibrant community dedicated to all things tech!',
  intro1: 'Our club is a dynamic hub where members come together to discuss emerging technologies, brainstorm innovative solutions to real-world problems, and collaborate on exciting projects. Whether you are a seasoned tech enthusiast or just starting your journey, there is a place for you here.',
  intro2: 'By joining our club, you will have the opportunity ',
}

// <-----img----->
import img1 from '../../assets/AI.jpeg';
import img2 from '../../assets/robot.jpeg';
import img3 from '../../assets/dev.jpeg';
import img4 from '../../assets/game.png';


export default function ACT6() {

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
            <title>Stu | AC6</title>
        </Helmet>
        <Headerstu data={data}/>


        {/* <---section1---> */}
        <div class="container mx-auto px-6 py-16 text-center">
        <div class="mx-auto max-w-lg">
            <h1 class="text-3xl font-bold text-gray-800 dark:text-[#1e3a8a] lg:text-4xl">Technology and Innovation Clubs</h1>
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
    <section class="bg-white dark:bg-[#eff6ff]">
    <div class="container mx-auto px-6 py-10">
        <h1 class="text-center text-3xl font-semibold capitalize text-gray-800 dark:text-[#1e3a8a] lg:text-4xl">Activities and events in the club</h1>

        <p class="mt-4 text-center text-gray-500 text-gray-400">{text_ACT1.intro2}</p>

        <div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-12 xl:grid-cols-3 xl:gap-12">
        <div>
            <img class="h-96 w-full rounded-lg object-cover" src={img2} />
            <h2 class="mt-4 text-2xl font-semibold capitalize text-gray-800 dark:text-[#1e3a8a]">Robot</h2>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Robot Building Workshops</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Programming Challenges</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Robot Competitions</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Guest Speakers and Tech Talks</p>
        </div>

        <div>
            <img class="h-96 w-full rounded-lg object-cover" src={img3} />
            <h2 class="mt-4 text-2xl font-semibold capitalize text-gray-800 dark:text-[#1e3a8a]">developer</h2>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Coding Workshops and Bootcamps</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Hackathons and Coding Challenges</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Tech Talks and Guest Speakers</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Project Collaborations</p>
        </div>

        <div>
            <img class="h-96 w-full rounded-lg object-cover" src={img4} />
            <h2 class="mt-4 text-2xl font-semibold capitalize text-gray-800 dark:text-[#1e3a8a]">E-sport</h2>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Weekly Tournaments</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Practice Sessions</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Scrims and Friendly Matches</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- E-sports Viewing Parties</p>
        </div>
        </div>
    </div>
    </section>
        





      </div>
    </HelmetProvider>
  )
}