import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import tw from 'twin.macro';

import { registerActivity, getFacActivity } from '../../helpers/stuhelper';
import Headerstu from './Headerstu';
import { useNavigate, useLocation } from 'react-router-dom';

// <-----img----->
import img1 from '../../assets/Ac1-1.jpeg';
import img2 from '../../assets/math.jpeg';
import img3 from '../../assets/Astronomy.jpeg';
import img4 from '../../assets/physic.jpeg';


const text_ACT1 = {
    intro: 'Get ready to play! Are you ready to break a sweat and have some fun? Join us for some action-packed sports!',
    intro1: 'Immerse yourself in fascinating topics and disciplines beyond the classroom curriculum. From exploring the wonders of science to unraveling the mysteries of literature, our clubs offer a platform for continuous learning and intellectual stimulation',
    intro2: 'Unleash Your Intellectual Curiosity: Join Our Academic Clubs!',
}


const Box = tw.div`w-9/12 bg-slate-200 rounded-md mx-10 text-center`;

export default function ACT1() {

  const navigate = useNavigate();
  const [data, setData] = useState('');

  const location = useLocation();
  const [id, setId] = useState('');
  const [num, setNum] = useState('');
 

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

  // advanced analysis
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
            <title>Stu | AC1</title>
        </Helmet>
        <Headerstu data={data}/>


        {/* <---section1---> */}
    <div className="container mx-auto px-6 py-16 text-center">
        <div className="mx-auto max-w-lg">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-[#0c4a6e] lg:text-4xl">Academic Clubs</h1>
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
    <section className="bg-white dark:bg-[#f0f9ff]">
    <div className="container mx-auto px-6 py-10">
        <h1 className="text-center text-3xl font-semibold capitalize text-gray-800 dark:text-[#0c4a6e] lg:text-4xl">Activities and events in the club</h1>

        <p className="mt-4 text-center text-gray-400">{text_ACT1.intro2}</p>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-12 xl:grid-cols-3 xl:gap-12">
        <div>
            <img className="h-96 w-full rounded-lg object-cover" src={img2} />
            <h2 className="mt-4 text-2xl font-semibold capitalize text-gray-800 dark:text-[#0c4a6e]">Math</h2>
            <p className="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Problem-Solving Workshops</p>
            <p className="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Math Competitions Preparation</p>
            <p className="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Math Enrichment Projects</p>
            <p className="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Guest Speaker Series</p>
        </div>

        <div>
            <img className="h-96 w-full rounded-lg object-cover" src={img3} />
            <h2 className="mt-4 text-2xl font-semibold capitalize text-gray-800 dark:text-[#0c4a6e]">Astronomy</h2>
            <p className="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Stargazing Events</p>
            <p className="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Astronomy Talks and Lectures</p>
            <p className="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Telescope Workshops</p>
            <p className="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Astronomy Field Trips</p>
        </div>

        <div>
            <img className="h-96 w-full rounded-lg object-cover" src={img4} />
            <h2 className="mt-4 text-2xl font-semibold capitalize text-gray-800 dark:text-[#0c4a6e]">Physic</h2>
            <p className="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Physics Experiments and Demonstrations</p>
            <p className="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Physics Problem-Solving Workshops</p>
            <p className="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Physics Olympiad Training</p>
            <p className="mt-2 text-lg uppercase tracking-wider text-blue-500 dark:text-gray-400">- Guest Speaker Series</p>
        </div>
        </div>
    </div>
    </section>
    
    <div className='flex flex-col items-center'>
    {
            (num.length > 0) ? (
              <Box className='flex flex-col items-center h-auto'>
                <p className='mt-3 font-bold'>History Detail of Course in Last Year</p>
                <table className='my-2 table-fixed  w-11/12'>
                  <thead>
                    <tr className='font-bold'>
                      <td>Faculty ID</td>
                      <td>Faculty Name</td>
                      <td>Number</td>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      num.map((nList, index) => (
                        <tr key={index} className='w-11/12 bg-blue-200 border-y-8 border-slate-200'>
                          <td className='py-1'>{nList.faculty_id}</td>
                          <td className='py-1'>{nList.faculty_name}</td>
                          <td className='py-1'>{nList.num_student}</td>
                        </tr>

                      ))
                    }
                  </tbody>
                </table>
              </Box>
            ) : (
              <Box className='h-5/6'>
                  <p className='mt-5'>No Attendent in This Activity</p>
              </Box>
            )
          }
    </div>




      </div>
    </HelmetProvider>
  )
}
