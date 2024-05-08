import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';


import Headerteacher from './Headerteacher';


export default function Teachertablecourse() {

  const [data, setData] = useState('');
  const [course, setCourse] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to={'/teacher/login'} replace={true}></Navigate>
    }
    // fetch teacher and include course details of this teacher
    const apiInfo = async () => {
        try {
          const res = await getInfoTeacher(localStorage.getItem('token'));
          setData(res);

        } catch (error) {
            toast.error('Cannot Get Information');
            console.error(error);
        } 
    };
    apiInfo();
  }, []);


  return (
    <div>
      <HelmetProvider>
        <Headerteacher data={data}/>
      </HelmetProvider>


      {/* <----textheader----> */}
      <div className='container px-2 py-24 mx-auto'>
        <div id="feedbackModal" className="feedbackModal">
                <div className="modalContent">
                  <h1 class="text-center text-3xl font-semibold capitalize text-sky dark:text-sky lg:text-4xl">My Course</h1>
                  <h2 style={{ textAlign: 'center', marginTop: '0px' }}>KMUTT UNIVERSITY</h2>


                  <div className = 'container mt-3'>
                      <h1  class='text-center  text-gray-600  '>Enhancing Your Learning Journey: Manage My Course</h1><br />
                  </div>
                </div>
          </div>


        {/* <----table------> */}

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
                  My courxe
                </th>
                
                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  
                </th>
              </tr>
            </thead>
          <tbody>
            <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              CPE232 : Data Model 
              </td>

              <div class ='flex flex-row-reverse mr-10 pt-1'>

              <button className="bg-[#9ca3af] hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border border-[#94a3b8] hover:border-transparent rounded mr-1">
                <Link to="/teacher/teacherEditcourse" className="block w-full h-full">
                Edit
                </Link>
              </button>

              <button className="bg-[#9ca3af] hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border border-[#94a3b8] hover:border-transparent rounded mr-1">
                <Link to="/teacher/teacherscore" className="block w-full h-full">
                Submit Score
                </Link>
              </button>

              <button className="bg-[#9ca3af] hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border border-[#94a3b8] hover:border-transparent rounded mr-1">
                <Link to="/teacher/teachercourse_info" className="block w-full h-full">
                Infomation
                </Link>
              </button>

              </div>
              
            
            </tr>
            <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              GEN111 : Man and Ethic of living
              </td>
              
              
              <div class ='flex flex-row-reverse mr-10 pt-1'>

              <button className="bg-[#9ca3af] hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border border-[#94a3b8] hover:border-transparent rounded mr-1">
                <Link to="/teacher/teacherEditcourse" className="block w-full h-full">
                Edit
                </Link>
              </button>

              <button className="bg-[#9ca3af] hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border border-[#94a3b8] hover:border-transparent rounded mr-1">
                <Link to="/teacher/teacherscore" className="block w-full h-full">
                Submit Score
                </Link>
              </button>

              <button className="bg-[#9ca3af] hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border border-[#94a3b8] hover:border-transparent rounded mr-1">
                <Link to="/teacher/teachercourse_info" className="block w-full h-full">
                Infomation
                </Link>
              </button>

              </div>
              
            </tr>
      
            <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">4</td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              CPE 223: COMPUTER ARCHITECTURES
              </td>


              <div class ='flex flex-row-reverse mr-10 pt-1'>

              <button className="bg-[#9ca3af] hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border border-[#94a3b8] hover:border-transparent rounded mr-1">
                <Link to="/teacher/teacherEditcourse" className="block w-full h-full">
                Edit
                </Link>
              </button>

              <button className="bg-[#9ca3af] hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border border-[#94a3b8] hover:border-transparent rounded mr-1">
                <Link to="/teacher/teacherscore" className="block w-full h-full">
                Submit Score
                </Link>
              </button>

              <button className="bg-[#9ca3af] hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border border-[#94a3b8] hover:border-transparent rounded mr-1">
                <Link to="/teacher/teachercourse_info" className="block w-full h-full">
                Infomation
                </Link>
              </button>

              </div>
              
            </tr>
            <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">5</td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              STA 302 : STATISTICS FOR ENGINEERS
              </td>

              <div class ='flex flex-row-reverse mr-10 pt-1'>

              <button className="bg-[#9ca3af] hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border border-[#94a3b8] hover:border-transparent rounded mr-1">
                <Link to="/teacher/teacherEditcourse" className="block w-full h-full">
                Edit
                </Link>
              </button>

              <button className="bg-[#9ca3af] hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border border-[#94a3b8] hover:border-transparent rounded mr-1">
                <Link to="/teacher/teacherscore" className="block w-full h-full">
                Submit Score
                </Link>
              </button>

              <button className="bg-[#9ca3af] hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border border-[#94a3b8] hover:border-transparent rounded mr-1">
                <Link to="/teacher/teachercourse_info" className="block w-full h-full">
                Infomation
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
      
      
    </div>

  )
}
