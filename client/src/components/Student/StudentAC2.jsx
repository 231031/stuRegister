import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

import { registerActivity, getFacActivity } from '../../helpers/stuhelper';
import Headerstu from './Headerstu';
import { useNavigate, useLocation } from 'react-router-dom';


// <----text---->
const text_ACT1 = {
  intro: 'Are you ready to unleash your athletic potential and be part of something extraordinary? Join our Sports Teams Clubs and embark on an exhilarating journey of teamwork, competition, and personal growth!',
  intro1: 'So, what are you waiting for? Lace up your shoes, grab your gear, and join us as we embark on an unforgettable journey of athleticism, teamwork, and triumph. Together, lets make this season one to remember!',
  intro2: 'Get in the Game! Join Our Sports Teams Clubs',
}

// <-----img----->
import img1 from '../../assets/AC2.jpg';
import img2 from '../../assets/hockey.webp';
import img3 from '../../assets/robby.jpeg';
import img4 from '../../assets/football.jpeg';


export default function ACT2() {

  const navigate = useNavigate();
  const [data, setData] = useState('');
  const [num, setNum] = useState('');

  const location = useLocation();
  const [id, setId] = useState('');
 

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

    if (location.state) {
      setId(location.state.activity_id);
    } else {
      navigate('/student/activity');
    }
  }, []);

  useEffect(() => {
    const apiNum = async () => {
      try {
        const res = getFacActivity(id);
        setNum(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (id) apiNum();
  }, [id]);
  

  async function handleClick() {
    try {
      const res = await registerActivity(id, data.student_id);
      toast.success(res.msg);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <HelmetProvider>
      <div>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <Helmet>
            <title>Stu | AC2</title>
        </Helmet>
        <Headerstu data={data}/>



        {/* <---section1---> */}
        <div className="container mx-auto px-6 py-16 text-center">
        <div className="mx-auto max-w-lg">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-[#064e3b] lg:text-4xl">Sports Teams</h1>
                <p className="mt-6 text-gray-500 dark:text-gray-400">{text_ACT1.intro}</p>
                    <button 
                    onClick={(e)=>handleClick()}
                    className="mt-6 rounded-lg bg-[#0d9488] px-6 py-2.5 text-center text-sm font-medium capitalize leading-5 text-white hover:bg-Slate focus:outline-none lg:mx-0 lg:w-auto">
                      Accept
                    </button>
                <p className="mt-3 text-sm text-gray-400">Let it fun! </p>
            </div>

            <div className="mt-10 flex justify-center">
            <img className="h-96 w-full rounded-xl object-cover lg:w-4/5" src={img1} />
            
        </div>
        <p className="mt-10 text-gray-500 dark:text-gray-400">{text_ACT1.intro1}</p>
    </div>

    {/* <-----section2-----> */}
    <section className="bg-white dark:bg-[#ecfdf5]">
    <div className="container mx-auto px-6 py-10">
        <h1 className="text-center text-3xl font-semibold capitalize text-gray-800 dark:text-[#064e3b] lg:text-4xl">Activities and events in the club</h1>

        <p className="mt-4 text-center text-gray-500 ">{text_ACT1.intro2}</p>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-12 xl:grid-cols-3 xl:gap-12">
        <div>
            <img className="h-96 w-full rounded-lg object-cover" src={img2} />
            <h2 className="mt-4 text-2xl font-semibold capitalize text-gray-800 dark:text-[#064e3b]">Hockey</h2>
            <p className="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Training Sessions</p>
            <p className="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Friendly Matches and Scrimmages</p>
            <p className="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Tournaments and Leagues</p>
            <p className="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Team Building Activities</p>
        </div>

        <div>
            <img className="h-96 w-full rounded-lg object-cover" src={img3} />
            <h2 className="mt-4 text-2xl font-semibold capitalize text-gray-800 dark:text-[#064e3b]">Robby</h2>
            <p className="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Training Sessions</p>
            <p className="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Intramural Competitions</p>
            <p className="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Skill Development Workshops</p>
            <p className="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Team Building Activities</p>
        </div>

        <div>
            <img className="h-96 w-full rounded-lg object-cover" src={img4} />
            <h2 className="mt-4 text-2xl font-semibold capitalize text-gray-800 dark:text-[#064e3b]">Football</h2>
            <p className="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Training Sessions</p>
            <p className="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Intramural Matches</p>
            <p className="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Tactical Workshops</p>
            <p className="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Fitness and Conditioning Programs</p>
        </div>
        </div>
    </div>
    </section>
        
        
      </div>
    </HelmetProvider>
  )
}