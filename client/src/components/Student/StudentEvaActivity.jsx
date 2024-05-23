import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Headerstu from './Headerstu';
import { getArrActivity } from '../../helpers/stuhelper';



const text = {
  intro: 'Do not Forget to Evaluate" Activity! As we embark on this journey of exploration and learning together, it is essential to reflect on our experiences and assess the impact of our activities. ',
}
export default function EvaluateActivity() {

  const navigate = useNavigate();
  const [data, setData] = useState('');
  const [eva, setEva] = useState(false);
  const [arr, setArr] = useState(false);

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

  useEffect(() => {
    const apiArr = async () => {
      try {
        const res = await getArrActivity(eva, data.student_id);
        setArr(res);
      } catch (error) {
        console.log(error);
      }
    }
    if (data) apiArr();
  }, [data]);

  function handleClick(id, hours) {
    navigate('/student/evaluateform', { state: { activity_id: id, hours: hours } });
  }

  return (
    <HelmetProvider>
      <div>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <Helmet>
          <title>Stu | Attended Activity</title>
        </Helmet>
        <Headerstu data={data} />



        {/* <---section1----> */}


        <div className="h-1/3 bg-sky dark:bg-sky pt-20">
          <div className="container mx-auto px-6 py-10">
            <h1 className="text-center text-3xl font-semibold capitalize text-darkgreen dark:text-darkgreen lg:text-4xl">Evaluate Activity</h1>

            <div className="mx-auto mt-6 flex justify-center">
              <span className="inline-block h-1 w-40 rounded-full bg-darkbrown"></span>
              <span className="mx-1 inline-block h-1 w-3 rounded-full bg-lowbrown"></span>
              <span className="inline-block h-1 w-1 rounded-full bg-lowbrown"></span>
            </div>

            <p className="mx-auto mt-6 max-w-2xl text-center text-darkbrown dark:text-lowbrown">{text.intro}</p>
          </div>
        </div>

        {/* <---section2----> */}

        <div className="grid-cols-2">
          <div className=" pt-10 overflow-x-auto sm:mx-0.5 lg:mx-0.5">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                {
                  (arr.length > 0) ? (
                    <table className="min-w-full">
                      <thead className="bg-gray-200 border-b">
                        <tr>
                          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            #
                          </th>
                          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Activity
                          </th>

                          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">

                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          arr.map((arrList, index) => (

                            <tr key={index} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {arrList.activity_name}
                              </td>

                              <div className='flex flex-row-reverse mr-10 pt-1'>
                                <button onClick={(e) => handleClick(arrList.activity_id, arrList.hours)}
                                  className="bg-[#0d9488] hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border border-[#0d9488] hover:border-transparent rounded mr-1">
                                  Evaluate
                                </button>

                              </div>
                            </tr>
                          ))

                        }
                      </tbody>
                    </table>
                  ) : (
                    <p className=''></p>
                  )
                }

              </div>
            </div>
          </div>
        </div>



      </div>
    </HelmetProvider>
  )
}



{/* <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
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
                            
                          </tr> */}

{/* <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
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
                            
                          </tr> */}

{/* <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
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

                          </tr> */}