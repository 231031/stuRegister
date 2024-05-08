import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';



import Headerteacher from './Headerteacher';


// <----textdropdown----->






export default function Teacherscore() {

    

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
                  <h1 class="text-center text-3xl font-semibold capitalize text-sky dark:text-sky lg:text-4xl">Submit score</h1>
                  <h2 style={{ textAlign: 'center', marginTop: '0px' }}>KMUTT UNIVERSITY</h2>


                  <div className = 'container mt-3'>
                      <h1  class='text-center  text-gray-600 text-2xl  '>GEN111: Man and Ethic of Living</h1><br />
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
                Student ID
                </th>
                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Student Name
                </th>

                <div class ='flex flex-row-reverse mr-10 pt-1'>
                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Grade
                </th>

                </div>
              </tr>
              
            </thead>
          <tbody>
          
            <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 ">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">6507050001</td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              Somsak Jiamsukun
              </td>

              <div class ='flex flex-row-reverse mr-10 pt-1'>

              
                {/* <----droupdowngrade----> */}
                <div className="w-100px px-3 ">
                    <div className="relative">
                        <select className="block appearance-none w-100px bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-200" id="grid-state">
                        <option > A </option>
                        <option > B </option>
                        <option > C </option>
                        <option > D </option>
                        <option > F </option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>

              </div>
              
            
            </tr>
            <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">6507050002</td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              Somchai Wongsawat
              </td>
              
              
              <div class ='flex flex-row-reverse mr-10 pt-1'>
                {/* <----droupdowngrade----> */}
                <div className="w-100px px-3 ">
                    <div className="relative">
                        <select className="block appearance-none w-100px bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-200" id="grid-state">
                        <option > A </option>
                        <option > B </option>
                        <option > C </option>
                        <option > D </option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>

              </div>
              
            </tr>
            
      
        

            
          </tbody>
        </table>

        <button className="mt-5 bg-sky hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 border border-sky hover:border-transparent rounded mr-1 " style={{ position: 'relative', left: '50%', transform: 'translate(-50%, 0%)' }}>
                        <Link to="" className="block w-full h-full">
                            Submit
                        </Link>
        </button>   


      </div>
    </div>
  </div>
</div>










      
      
      
      </div>
      
      
    </div>

  )
}
