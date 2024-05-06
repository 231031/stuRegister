import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

import Headerstu from './Headerstu';
import { useNavigate } from 'react-router-dom';



// <----text---->
const text_ACT1 = {
  intro: 'Are you passionate about exploring diverse cultures and connecting with people from around the world? Do you want to be part of a community that celebrates cultural diversity and promotes cross-cultural understanding? If so, we invite you to join our Cultural Club!',
  intro1: 'At our club, we believe in the power of cultural exchange to foster friendship, appreciation, and unity among people of different backgrounds. Whether you are interested in learning new languages, discovering traditional cuisines, or experiencing vibrant arts and traditions, there is something for everyone in our club.',
  intro2: 'Explore diverse cultures through workshops, presentations, and cultural events.',
}

// <-----img----->
import img1 from '../../assets/LASU.jpg';
import img2 from '../../assets/Japan.jpeg';
import img3 from '../../assets/Garden.webp';
import img4 from '../../assets/pet.jpeg';


export default function ACT5() {

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
            <title>Stu | AC5</title>
        </Helmet>
        <Headerstu data={data}/>


        {/* <---section1---> */}
        <div class="container mx-auto px-6 py-16 text-center">
        <div class="mx-auto max-w-lg">
            <h1 class="text-3xl font-bold text-gray-800 dark:text-[#365314] lg:text-4xl">Cultural Clubs</h1>
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
    <section class="bg-white dark:bg-[#f7fee7]">
    <div class="container mx-auto px-6 py-10">
        <h1 class="text-center text-3xl font-semibold capitalize text-gray-800 dark:text-[#365314] lg:text-4xl">Activities and events in the club</h1>

        <p class="mt-4 text-center text-gray-500 text-gray-400">{text_ACT1.intro2}</p>

        <div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-12 xl:grid-cols-3 xl:gap-12">
        <div>
            <img class="h-96 w-full rounded-lg object-cover" src={img2} />
            <h2 class="mt-4 text-2xl font-semibold capitalize text-gray-800 dark:text-[#365314]">Japan</h2>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Explore the art of sushi-making</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Experience the beauty of Japanese musics</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Discover the art of Japanese calligraphy</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Learn Japanese language</p>
        </div>

        <div>
            <img class="h-96 w-full rounded-lg object-cover" src={img3} />
            <h2 class="mt-4 text-2xl font-semibold capitalize text-gray-800 dark:text-[#365314]">Chiness</h2>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Learn Mandarin Chinese</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Explore Chinese history</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Chinese Music and Dance Performances</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Learn Chiness language</p>
        </div>

        <div>
            <img class="h-96 w-full rounded-lg object-cover" src={img4} />
            <h2 class="mt-4 text-2xl font-semibold capitalize text-gray-800 dark:text-[#365314]">South Korea</h2>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Language Exchange Sessions:</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- K-Pop and K-Drama Nights</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Cultural Presentations</p>
            <p class="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Korean Cultural Festivals</p>
        </div>
        </div>
    </div>
    </section>
        



      </div>
    </HelmetProvider>
  )
}