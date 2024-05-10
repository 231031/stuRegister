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
                <div class="bg-[#e4e4e7] p-3 shadow-sm rounded-sm">
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
                        {/* <--line1---> */}
                        <div class="grid md:grid-2 text-sm">
                            <div class="flex ">
                                <div className="mt-2 w-200  px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                    First Name :
                                    </label>
                                <input className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text"/>
                                </div>

                                <div className="mt-2 w-200  px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                    Last Name :
                                    </label>
                                <input className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text"/>
                                </div>

                                <div className='mt-2 w-200  px-3 mb-6 md:mb-0' >
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-salary">
                                        Gender :
                                    </label>
                                    <div className="relative">
                                        <select 
                                        className="block appearance-none h-13 w-500 bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                        <option value='Male'>  Male   </option>
                                        <option value='Female'>  Female </option>
                                        
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center  text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                        </div>
                                    </div>

                                </div>

                                <div className="mt-2 w-200 px-3 mb-6 md:mb-0 ">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                    ID card :
                                    </label>
                                <input className="block appearance-none block w-700 bg-white text-gray-700 border border-gray-200 rounded py-3  px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text"/>
                                </div>



                            </div>
                        </div>
                        {/* <---ENDline1----> */}

                        {/* <---line2----> */}
                        <div class="grid md:grid-2 text-sm">
                            <div class="flex ">
                                <div className='mt-5 w-300  px-3 mb-6 md:mb-0' >
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-salary">
                                        Day of Birth :
                                    </label>
                                    <div className="relative">
                                        <select 
                                        className="block appearance-none h-13 bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"style={{height:50 ,width : 200}} >
                                        <option value='M1'>  January  </option>
                                        <option value='M2'>  February </option>
                                        <option value='M3'>  March </option>
                                        <option value='M4'>  April  </option>
                                        <option value='M5'>  May </option>
                                        <option value='M6'>  June </option>
                                        <option value='M7'>  July  </option>
                                        <option value='M8'>  August </option>
                                        <option value='M9'>  September </option>
                                        <option value='M10'>  October </option>
                                        <option value='M11'>  November </option>
                                        <option value='M12'>  December </option>

                                        
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center  text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                        </div>
                                    </div>
                                </div>

                                <div className='mt-5 w-200  px-3 mb-6 md:mb-0' >
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-salary">
                                        D
                                    </label>
                                    <div className="relative">
                                        <select 
                                        className="appearance-none h-13 w-500 bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" style={{height:50,width : 200 }} >
                                        <option value='D1'>  1  </option>
                                        <option value='D2'>   2 </option>
                                        <option value='D3'>   3 </option>
                                        <option value='D4'>   4 </option>
                                        <option value='D5'>   5 </option>
                                        <option value='D6'>   6 </option>
                                        <option value='D7'>   7 </option>
                                        <option value='D8'>   8 </option>
                                        <option value='D9'>   9 </option>
                                        <option value='D10'>   10 </option>
                                        <option value='D11'>   11 </option>
                                        <option value='D12'>  12  </option>
                                        <option value='D13'>   13 </option>
                                        <option value='D14'>   14 </option>
                                        <option value='D15'>   15 </option>
                                        <option value='D16'>   16 </option>
                                        <option value='D17'>   17 </option>
                                        <option value='D18'>   18 </option>
                                        <option value='D19'>   19 </option>
                                        <option value='D20'>   20 </option>
                                        <option value='D21'>   21 </option>
                                        <option value='D22'>   22 </option>
                                        <option value='D23'>  23  </option>
                                        <option value='D24'>   24 </option>
                                        <option value='D25'>   25 </option>
                                        <option value='D26'>   26</option>
                                        <option value='D27'>   27 </option>
                                        <option value='D28'>   28 </option>
                                        <option value='D29'>   29 </option>
                                        <option value='D30'>   30 </option>
                                        <option value='D31'>   31 </option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center  text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 w-100  px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                    Y :
                                    </label>
                                <input className="appearance-none h-13  w-500 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" style={{width:100 , width : 200}}/>
                                </div>

                                <div className="mt-5 w-100  px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                    Age :
                                    </label>
                                <input className="appearance-none h-13  w-500 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" style={{width:100 , height:50}}/>
                                </div>
                            </div>
                        </div>
                        </div>
                        {/* <---ENDline2----> */}
                        {/* <---line3---> */}
                        <div class="grid md:grid-2 text-sm">
                            <div class ="flex">
                                <div className="mt-5 w-100  px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                    Address :
                                    </label>
                                <input className="appearance-none h-13  w-500 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" style={{width:225 , height:50}}/>
                                </div>

                                <div className="mt-5 w-100  px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                    City :
                                    </label>
                                <input className="appearance-none h-13  w-500 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" style={{width:225 , height:50}}/>
                                </div>

                                <div className="mt-5 w-100  px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                    State :
                                    </label>
                                <input className="appearance-none h-13  w-500 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" style={{width:225 , height:50}}/>
                                </div>

                                <div className="mt-5 w-100  px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                    Zip code :
                                    </label>
                                <input className="appearance-none h-13  w-500 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" style={{width:150 , height:50}}/>
                                </div>
                            </div>
    
                        </div>
                        {/* <---ENDline3---> */}
                        {/* <---line4---> */}
                        <div className='grid md:grid-2 text-sm'>
                            <div  class ="flex">
                                <div className="mt-5 w-100  px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                        Email :
                                        </label>
                                    <input className="appearance-none h-13  w-500 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" style={{width:400 , height:50}}/>
                                </div>
                                <div className="mt-5 w-100  px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                        Phone :
                                        </label>
                                    <input className="appearance-none h-13  w-500 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" style={{width:400 , height:50}}/>
                                </div>

                                



                            </div>
                        </div>




                        {/* <----ENDline4---> */}
                </div>
                {/* <!-- End of about section --> */}

                <div class="my-4"></div>

                {/* <!-- section2 --> */}
                <div class="bg-sky p-3 shadow-sm rounded-sm">
                    <div class="flex items-center space-x-2 font-semibold text-white leading-8">
                        <span clas="text-green-500">
                            <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
                        <span class="tracking-wide">Parent Register 1 (Father)</span>
                        
                    </div>

                    {/* <--line1---> */}
                    <div className=''>
                    
                        <div class="grid md:grid-2 text-sm">
                            <div class="flex ">
                                <div className="mt-2 w-200  px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-city">
                                    First Name :
                                    </label>
                                <input className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text"/>
                                </div>

                                <div className="mt-2 w-200  px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-city">
                                    Last Name :
                                    </label>
                                <input className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text"/>
                                </div>

                                

                                <div className="mt-2 w-200 px-3 mb-6 md:mb-0 ">
                                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-city">
                                    ID card :
                                    </label>
                                <input className="block appearance-none block w-700 bg-white text-gray-700 border border-gray-200 rounded py-3  px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text"/>
                                </div>

                                <div className="mt-2 w-100  px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-city">
                                    Age :
                                    </label>
                                <input className="appearance-none h-13  w-500 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" style={{width:100 }}/>
                                </div>
                            </div>
                        </div>
                    </div>
                        {/* <---ENDline1----> */}

                    <div class="grid md:grid-2 text-sm">
                        <div  class="flex ">
                            <div className='mt-5 w-300  px-3 mb-6 md:mb-0' >
                                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-salary">
                                        Salary :
                                    </label>
                                    <div className="relative">
                                        <select 
                                        className="block appearance-none h-13 bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"style={{height:50 ,width : 300}} >
                                        <option value='10,000 - 25,000'>   10,000 - 25,000        Bath   </option>
                                        <option value='25,000 - 30,000'>   25,000 - 30,000        Bath   </option>
                                        <option value='30,000 - 50,000'>   30,000 - 50,000        Bath   </option>
                                        <option value='50,000 - 100,000'>   50,000 - 100,000        Bath   </option>

                                        
                                        </select>
                                        <div className=" pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                        </svg>
                                    </div>
                                    </div>
                            </div>

                            <div className="mt-5 w-200 px-3 mb-6 md:mb-0 ">
                                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-city">
                                    Email :
                                    </label>
                                <input className="block appearance-none block w-700 bg-white text-gray-700 border border-gray-200 rounded py-3  px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" style={{height:50 ,width : 300}}/>
                            </div>

                            <div className="mt-5 w-200 px-3 mb-6 md:mb-0 ">
                                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-city">
                                    Phone :
                                    </label>
                                <input className="block appearance-none block w-700 bg-white text-gray-700 border border-gray-200 rounded py-3  px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" style={{height:50 ,width : 250}}/>
                            </div>


                        
                        </div>
                        

                    </div>



                    
                    
                </div>
                {/* <!-- End of profile tab --> */}
            </div>
        </div>
    </div>
    
        
                        


                      
                    
        
</div>
    </HelmetProvider>
  )
}