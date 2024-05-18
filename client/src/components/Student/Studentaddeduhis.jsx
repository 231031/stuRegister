import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import Headerstu from './Headerstu';
import { getStuTerm, getInfo, getGpax } from '../../helpers/stuhelper';


// <----img---->
import profile from '../../assets/profile.png';


export default function Studentaddeduhis() {

  const navigate = useNavigate();
  const [data, setData] = useState('');
  const [regis, setRegis] = useState('');
  const [gpax, setGpax] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/student/login');
    }

    const fetchData = async () => {
      try {
        const [infoRes, gpaxRes] = await Promise.all([
          getInfo(),
          getGpax(),
        ]);
        setData(infoRes);
        setGpax(gpaxRes.gpax);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

  }, []);

  useEffect(() => {
    const apiTerm = async () => {
      try {
        const token = localStorage.getItem('token');
        const [department_id, year, student_id] = token.split('-');

        const res = await getStuTerm(data?.student_id, year);
        setRegis(res.register_term);
      } catch (error) {
        console.log(error);
      }
    }
    if (data) apiTerm();
  }, [data]);

  return (
    <HelmetProvider>
      <div>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <Helmet>
          <title>Stu | EduHis</title>
        </Helmet>
        <Headerstu data={data} />


        <div className="md:flex no-wrap md:-mx-2 ">


          {/* <!-- Left Side --> */}

          <div className="container flex flex-row">
            <div className="w-1/4 bg-sky p-10 " style={{ height: "1500px" }} >

              <div className="p-3 border-t-4 border-gray-800 h-full" >
                <div className="image overflow-hidden">
                  <img className="h-30px w-30px mx-auto"
                    src={profile}
                    alt="" />
                </div>
                <h1 className="text-white font-bold text-xl leading-8 my-1">{data?.first_name} {data?.last_name}</h1>
                <h3 className="text-white font-lg text-semibold hover:text-gray-600 leading-6">{data?.department_id}</h3>
                <p className="text-sm text-white hover:text-gray-600 leading-6">Year : {data?.year}</p>
                <ul
                  className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li className="flex items-center py-3">
                    <span>Email : </span>
                    <span className="ml-auto">{data?.email}</span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>ID : </span>
                    <span className="ml-auto">{data?.student_id}</span>
                  </li>
                </ul>
                <br />
                <div className="flex items-center space-x-3 font-semibold text-white text-xl leading-8">

                  <span>GPAX: {gpax}</span>


                </div>
              </div>





            </div>
            {/* <!-- End of profile card --> */}




            <div className="w-full md:w-9/12 mx-2 h-64">
              {
                (regis?.length > 0) ? (
                  regis.map((rList, index) => (
                    <div className="ml-10 mt-10 bg-[#f1f5f9] p-3 shadow-sm rounded-sm" key={index}>
                      <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span className="tracking-wide ml-2">{rList.term} st Term</span>
                      </div>
                      <div className="grid-cols-2">
                        <div className=" pt-10 overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                              <table className="min-w-full">
                                <thead className="bg-gray-200 border-b">

                                  <tr>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                      ID
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                      Course Name
                                    </th>

                                    <div class='flex flex-row-reverse mr-10 pt-1'>
                                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Grade
                                      </th>

                                    </div>
                                  </tr>

                                </thead>
                                <tbody>
                                {
                                  (rList.course_term.length > 0) ? (
                                    rList.course_term.map((cList, ind) => (
                                        <tr key={ind} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 ">
                                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {cList.course_id}
                                          </td>
                                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {cList.course_name}
                                          </td>
                                          <div class='flex flex-row-reverse mr-10 pt-1'>
                                            <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 ">
                                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cList.grade}</td>
                                            </tr>
                                          </div>
                                        </tr>

                                      
                                    ))
                                  ) : (
                                        <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 ">
                                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            CPE232
                                          </td>
                                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            Data Model
                                          </td>
                                          <div class='flex flex-row-reverse mr-10 pt-1'>
                                            <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 ">
                                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">A</td>
                                            </tr>
                                          </div>
                                        </tr>
                                  )
                                }
                                </tbody>

                              </table>


                              <button className="mt-5 bg-sky hover:bg-sky text-white font-semibold hover:text-white py-2 px-4 border border-sky hover:border-transparent rounded mr-1 " style={{ position: 'relative', left: '50%', transform: 'translate(-50%, 0%)' }}>
                                <Link to="" className="block w-full h-full">
                                  GPA : {rList.grade_term}
                                </Link>
                              </button>



                            </div>
                          </div>
                        </div>
                      </div>






















                    </div>

                  ))
                ) : (
                  <p></p>
                )
              }

            </div>
          </div>
        </div>










      </div>
    </HelmetProvider>
  )
}

{/* term2*/ }

{/* <div className="">
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                    <span className="tracking-wide ml-2">2st Term</span>
                  </div>

                  <div className="grid-cols-2 mt-10">
                    <div className=" pt-10 overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                          <table className="min-w-full">
                            <thead className="bg-gray-200 border-b">

                              <tr>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                  ID
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                  Course Name
                                </th>

                                <div class='flex flex-row-reverse mr-10 pt-1'>
                                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Grade
                                  </th>

                                </div>
                              </tr>

                            </thead>
                            <tbody>

                              <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 ">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  CPE232
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  Data Model
                                </td>
                                <div class='flex flex-row-reverse mr-10 pt-1'>
                                  <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 ">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">A</td>
                                  </tr>
                                </div>
                              </tr>

                              <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 ">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  GEN111
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  Man and Ethic of living
                                </td>
                                <div class='flex flex-row-reverse mr-10 pt-1'>
                                  <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 ">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">A</td>
                                  </tr>
                                </div>
                              </tr>

                              <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 ">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  CPE223
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  Computer Architectures
                                </td>
                                <div class='flex flex-row-reverse mr-10 pt-1'>
                                  <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 ">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">A</td>
                                  </tr>
                                </div>
                              </tr>

                            </tbody>
                          </table>


                          <button className="mt-5 bg-sky hover:bg-sky text-white font-semibold hover:text-white py-2 px-4 border border-sky hover:border-transparent rounded mr-1 " style={{ position: 'relative', left: '50%', transform: 'translate(-50%, 0%)' }}>
                            <Link to="" className="block w-full h-full">
                              GPA : 4.00
                            </Link>
                          </button>
                        </div>
                      </div>



                    </div>
                  </div>
                </div> */}

{/* end of term2*/ }



{/* summer */ }

{/* <div className="">
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                    <span className="tracking-wide ml-2">Summer</span>
                  </div>

                  <div className="grid-cols-2 mt-10">
                    <div className=" pt-10 overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                          <table className="min-w-full">
                            <thead className="bg-gray-200 border-b">

                              <tr>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                  ID
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                  Course Name
                                </th>

                                <div class='flex flex-row-reverse mr-10 pt-1'>
                                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                    Grade
                                  </th>

                                </div>
                              </tr>

                            </thead>
                            <tbody>

                              <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 ">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  CPE232
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  Data Model
                                </td>
                                <div class='flex flex-row-reverse mr-10 pt-1'>
                                  <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 ">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">A</td>
                                  </tr>
                                </div>
                              </tr>

                              <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 ">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  GEN111
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  Man and Ethic of living
                                </td>
                                <div class='flex flex-row-reverse mr-10 pt-1'>
                                  <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 ">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">A</td>
                                  </tr>
                                </div>
                              </tr>

                              <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 ">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  CPE223
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  Computer Architectures
                                </td>
                                <div class='flex flex-row-reverse mr-10 pt-1'>
                                  <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 ">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">A</td>
                                  </tr>
                                </div>
                              </tr>

                            </tbody>
                          </table>


                          <button className="mt-5 bg-sky hover:bg-sky text-white font-semibold hover:text-white py-2 px-4 border border-sky hover:border-transparent rounded mr-1 " style={{ position: 'relative', left: '50%', transform: 'translate(-50%, 0%)' }}>
                            <Link to="" className="block w-full h-full">
                              GPA : 4.00
                            </Link>
                          </button>
                        </div>
                      </div>



                    </div>
                  </div>
                </div> */}

{/* summer */ }
