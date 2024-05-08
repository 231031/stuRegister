import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Headerstu from './Headerstu';
import profile from '../../assets/profile.png';

// <--text--->
const text = {
    name: 'Praew EiEi',
    student_id: '65070501063',
    year: '2',
    Faculty: 'Computer Engineering',
    Email: 'i@kmutt.ac.th'
  }
  

export default function Studentregister() {

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
            <title>Stu | register s</title>
        </Helmet> 
        <Headerstu data={data}/>

           

    <div class="container mx-auto my-5 p-5">
        <div class="md:flex no-wrap md:-mx-2 ">
            {/* <!-- Left Side --> */}
            <div class="w-full md:w-3/12 md:mx-2">
                {/* <!-- Profile Card --> */}
                <div class="bg-white p-3 border-t-4 border-sky">
                    <div class="image overflow-hidden">
                        <img class="h-auto w-full mx-auto"
                            src={profile}
                            alt=""/>
                    </div>
                    <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">{text.name}</h1>
                    <h3 class="text-gray-600 font-lg text-semibold leading-6">ID {text.student_id}</h3>
                    <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">{text.Faculty}</p>
                    <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">Year {text.year}</p>
                    <ul
                        class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                        <li class="flex items-center py-3">
                            <span>Status</span>
                            <span class="ml-auto"><span
                                    class="bg-green-500 py-1 px-2 rounded text-white text-sm">Study</span></span>
                        </li>
                        <li class="flex items-center py-3">
                            <span>Study since</span>
                            <span class="ml-auto">Nov 07, 2016</span>
                        </li>
                    </ul>
                </div>
                {/* <!-- End of profile card --> */}
                <div class="my-4"></div> 
            </div>
            {/* <!-- Right Side --> */}
            <div class="w-full md:w-9/12 mx-2 h-64">
                {/* <!-- Profile tab -->
                <!-- About Section --> */}
                <div class="bg-white p-3 shadow-sm rounded-sm">
                    <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span clas="text-green-500">
                            <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
                        <span class="tracking-wide">Student Register</span>
                    </div>
                    <div class="text-gray-700">
                        <div class="grid md:grid-cols-2 text-sm">
                            <div className="mt-2 w-200  px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                First Name :
                                </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text"/>
                            </div>

                            <div className="mt-2 w-200  px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                Last Name :
                                </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text"/>
                            </div>
                        </div>

                        <div class="grid md:grid-cols-5 gap-4 text-sm">
                            <div className="px-3 mt-2" style={{width : 200}}>
                                <div className='md:grid-cols-2 hover:col-span-1'>
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-salary">
                                        Gender :
                                    </label>
                                    <div className="">
                                        <select 
                                        className="block appearance-none w-500 bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                        <option value='10,000 - 25,000'>  Male   </option>
                                        <option value='10,000 - 25,000'>  Female </option>
                                        
                                        </select>
                                        {/* <div className="pointer-events-none absolute inset-y-0 ml-4 flex items-center  text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                        </div> */}
                                    </div>

                                </div>
                                    
                            </div>

                                <div className="mt-2 w-200  px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                    ID card :
                                    </label>
                                <input className="appearance-none block w-1000 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text"/>
                                </div>
                            </div>





                        </div>

                    <button
                        class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Show
                        Full Information</button>
                </div>
                {/* <!-- End of about section --> */}

                <div class="my-4"></div>

                {/* <!-- Experience and education --> */}
                <div class="bg-white p-3 shadow-sm rounded-sm">

                    
                    {/* <!-- End of Experience and education grid --> */}
                </div>
                {/* <!-- End of profile tab --> */}
            </div>
        </div>
    </div>
    
        
                        


                      
                    
        
</div>
    </HelmetProvider>
  )
}