import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import Headerstu from './Headerstu';
import { getArrActivity } from '../../helpers/stuhelper';


const text = {
  intro: 'Do not Forget to Evaluate" Activity! As we embark on this journey of exploration and learning together, it is essential to reflect on our experiences and assess the impact of our activities. ',
}
export default function AttendedActivity() {

  const navigate = useNavigate();
  const [data, setData] = useState('');
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
        const res = await getArrActivity(true, data.student_id); // get all attended activity
        setArr(res);
      } catch (error) {
        console.log(error);
      }
    }
    if (data) apiArr();
  }, [data]);

  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <title>Stu | Attended Activity</title>
        </Helmet>
        <Headerstu data={data} />



        {/* <---section1----> */}


        <div class="h-[16rem] bg-gray-100 dark:bg-gray-800">
          <div class="container mx-auto px-6 py-10">
            <h1 class="text-center text-3xl font-semibold capitalize text-gray-800 dark:text-white lg:text-4xl">Attended Activity</h1>

            <div class="mx-auto mt-6 flex justify-center">
              <span class="inline-block h-1 w-40 rounded-full bg-blue-500"></span>
              <span class="mx-1 inline-block h-1 w-3 rounded-full bg-blue-500"></span>
              <span class="inline-block h-1 w-1 rounded-full bg-blue-500"></span>
            </div>

            <p class="mx-auto mt-6 max-w-2xl text-center text-gray-500 dark:text-gray-300">{text.intro}</p>
          </div>
        </div>

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
                                {
                                  (arrList.status == 1) ? (
                                    <p
                                      className="bg-blue-800 hover:bg-Slate text-white font-semibold py-2 px-4 pt-1 border border-[#0d9488] hover:border-transparent rounded mr-1">
                                      Evaluated
                                    </p>
                                  ) : (
                                    <p
                                      className="bg-red-800 hover:bg-Slate text-white font-semibold py-2 px-4 pt-1 border border-[#0d9488] hover:border-transparent rounded mr-1">
                                      Not Evaluated
                                    </p>
                                  )
                                }


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