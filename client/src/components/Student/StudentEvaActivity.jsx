import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Headerstu from './Headerstu';



const text = {
  intro : 'Do not Forget to Evaluate" Activity! As we embark on this journey of exploration and learning together, it is essential to reflect on our experiences and assess the impact of our activities. ',
}
export default function EvaluateActivity() {

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
            <title>Stu | Attended Activity</title>
        </Helmet> 
        <Headerstu data={data}/>



        {/* <---section1----> */}


        <div class="h-[16rem] bg-gray-100 dark:bg-gray-800">
        <div class="container mx-auto px-6 py-10">
        <h1 class="text-center text-3xl font-semibold capitalize text-gray-800 dark:text-white lg:text-4xl">Evaluate Activity</h1>

        <div class="mx-auto mt-6 flex justify-center">
            <span class="inline-block h-1 w-40 rounded-full bg-blue-500"></span>
            <span class="mx-1 inline-block h-1 w-3 rounded-full bg-blue-500"></span>
            <span class="inline-block h-1 w-1 rounded-full bg-blue-500"></span>
        </div>

        <p class="mx-auto mt-6 max-w-2xl text-center text-gray-500 dark:text-gray-300">{text.intro}</p>
        </div>
    </div>

    {/* <---section2----> */}

    <div class="grid-cols-2">
    <div class=" pt-10 overflow-x-auto sm:mx-0.5 lg:mx-0.5">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table class="min-w-full">
            <thead class="bg-gray-200 border-b">
              <tr>
                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  #
                </th>
                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Activity
                </th>
                
                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  
                </th>
              </tr>
            </thead>
          <tbody>
            <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              Academic Clubs
              </td>

              <div class ='flex flex-row-reverse mr-10 pt-1'>
              <button className="bg-[#0d9488] hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border border-[#0d9488] hover:border-transparent rounded mr-1">
                <Link to="/student/evaluateform" className="block w-full h-full">
                Evaluate
                </Link>
              </button>
              </div>
              
            
            </tr>
            <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              Sports Teams
              </td>
              
              
              <div class ='flex flex-row-reverse mr-10 pt-1'>
              <button className="bg-[#0d9488] hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border border-[#0d9488] hover:border-transparent rounded mr-1">
                <Link to="/student/evaluateform" className="block w-full h-full">
                Evaluate
                </Link>
              </button>
              </div>
              
            </tr>
      
            <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">4</td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              Creative Arts
              </td>
              <div class ='flex flex-row-reverse mr-10 pt-1'>
              <button className="bg-[#0d9488] hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border border-[#0d9488] hover:border-transparent rounded mr-1">
                <Link to="/student/evaluateform" className="block w-full h-full">
                Evaluate
                </Link>
              </button>
              </div>
              
            </tr>
            <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">5</td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              Community Service
              </td>

              <div class ='flex flex-row-reverse mr-10 pt-1'>
              <button className="bg-[#0d9488] hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border border-[#0d9488] hover:border-transparent rounded mr-1">
                <Link to="/student/evaluateform" className="block w-full h-full">
                Evaluate
                </Link>
              </button>
              </div>

            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>


        
      </div>
    </HelmetProvider>
  )
}