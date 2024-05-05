import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import Headerstu from './Headerstu';




export default function Scholarform() {

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
      <form>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <Helmet>
            <title>Stu | Scholarform</title>
        </Helmet> 
        <Headerstu data={data}/>



        {/* <-----section1-----> */}
        <div class ="mt-10 md:container md:mx-auto">
        <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2" htmlfor="Agent Register">
        Agent Register
         </label>
        {/* <div lassName="w-full max-w-lg"> */}
          <div className="flex flex-wrap mt-10 -mx-3 mb-6">
            <div className="w-300px  px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlfor="grid-first-name">
                First Name
              </label>
              <input className="appearance-none block w-200 bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Praewa"/>
              <p className="text-red-500 text-xs italic">Please fill out this field.</p>
            </div>
            <div className="w-300px  px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlfor="grid-last-name">
                Last Name
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Choobanna"/>
            </div>
            <div className="w-200px px-3 ">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlfor="grid-state">
                Gender
              </label>
              {/* <div className="relative"> */}
                <select className="block appearance-none w-400px bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
                  <option>Female</option>
                  <option>Male</option>
                </select>
              {/* </div> */}
            </div>

            <div className="w-300px px-3 ">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlfor="grid-salary">
                Salary
              </label>
              <div className="relative">
                <select className="block appearance-none w-600px bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                  <option>   10,000 - 25,000        Bath   </option>
                  <option>   25,000 - 30,000        Bath   </option>
                  <option>   30,000 - 50,000        Bath   </option>
                  <option>   50,000 - 100,000        Bath   </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
            
            
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-400px px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlfor="grid-password">
                Email id
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="Praeweiei_sudsuay@gmail.com"/>
              <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
            </div>
            <div className="w-300px  px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlfor="grid-last-name">
                Mobile No:
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="xxx-xxx-xxxx"/>
            </div>

            

            <div className=" w-300px px-3 ">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlfor="grid-dayofbirth">
                Day of birth
              </label>
                <div className="relative">
                  <select className="block appearance-none w-600px bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                    <option>May</option>
                  </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
            </div>
            <div className=" w-300px px-3 ">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlfor="grid-dayofbirth">
                .
              </label>
                <div className="relative">
                  <select className="block appearance-none w-600px bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                    <option>17</option>
                  </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
            </div>
            <div className=" w-300px px-3 ">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlfor="grid-dayofbirth">
                .
              </label>
                <div className="relative">
                  <select className="block appearance-none w-600px bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                    <option>2004</option>
                  </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
            </div>
            

              
              
            

          

          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-200  px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlfor="grid-city">
                City
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque"/>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlfor="grid-state">
                State
              </label>
              <div className="relative">
                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                  <option>Bangkok</option>
                  <option>nakhon si thammarat </option>
                  <option>chiang mai </option>
                  <option>ดาวอังคาร </option>
                  <option>ที่ชอบๆ</option>

                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                Zip
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210"/>
            </div>

            <div className="mt-6 w-full md:w-1/1 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                Address
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210"/>
            </div>
          </div>

        <div class="mt-8 mb-6 pt-4">
        <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2" htmlfor="Agent Register">
        file graduation certificate
         </label>

        <div class="mt-8 mb-8">
          <input type="file" name="file" id="file" class="sr-only" />
          <label
            for="file"
            class="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
          >
            <div>
              <span class="mb-2 block text-xl font-semibold text-[#07074D]">
                Drop files here
              </span>
              <span class="mb-2 block text-base font-medium text-[#6B7280]">
                Or
              </span>
              <span
                class="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]"
              >
                Browse
              </span>
            </div>
          </label>
        </div>

        <div class="mb-5 rounded-md bg-[#F5F7FB] py-4 px-8">
          <div class="flex items-center justify-between">
            <span class="truncate pr-3 text-base font-medium text-[#07074D]">
              banner-design.png
            </span>
            <button class="text-[#07074D]">
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                  fill="currentColor"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>

        <div class="rounded-md bg-[#F5F7FB] py-4 px-8">
          <div class="flex items-center justify-between">
            <span class="truncate pr-3 text-base font-medium text-[#07074D]">
              banner-design.png
            </span>
            <button class="text-[#07074D]">
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                  fill="currentColor"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          <div class="relative mt-5 h-[6px] w-full rounded-lg bg-[#E2E5EF]">
            <div
              class="absolute left-0 right-0 h-full w-[75%] rounded-lg bg-[#6A64F1]"
            ></div>
          </div>
        </div>
      </div>

      <div>
        <button
          class="hover:shadow-form w-full rounded-md bg-sky py-3 px-8 text-center text-base font-semibold text-white outline-none"
        >
          Submit
        </button>

        <label className="block uppercase tracking-wide text-white text-xl font-bold mb-2" htmlfor="Agent Register">
        .
         </label>
      </div>



        {/* ____ */}
        </div>
        
      </form>
    </HelmetProvider>
  )
}