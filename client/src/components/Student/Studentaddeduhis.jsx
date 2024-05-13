import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import Headerstu from './Headerstu';
import { getStuTerm, getInfo } from '../../helpers/stuhelper';


// <----img---->
import profile from '../../assets/profile.png';

const text = {
  name: 'Praew EiEi',
  student_id: '65070501063',
  year: '2',
  Faculty: 'Computer Engineering',
  Email: 'i@kmutt.ac.th'
}


export default function Studentaddeduhis() {

  const navigate = useNavigate();
  const [data, setData] = useState('');
  const [term, setTerm] = useState('');
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/student/login');
    } 
    const [department_id, year, student_id] = token.split('-');

    const apiInfo = async () => {
      try {
        const res = await getInfo(student_id);
        setData(res);
      } catch (error) {
        console.log(error);
      }
    }
    if (student_id) apiInfo();    

    setDate(new Date().getDate());
    setMonth(new Date().getMonth());
  }, []);

  useEffect(() => {
    const apiTerm = async () => {
      try {
        const res = await getStuTerm(data?.student_id, data?.year);
        setTerm(res);
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
            <title>Stu | AddEduHis</title>
        </Helmet>
        <Headerstu data={data}/>

        
        <div className="md:flex no-wrap md:-mx-2 ">
          

        {/* <!-- Left Side --> */}
        
          <div className="container flex flex-row">
            <div className="w-1/4 bg-gray-800 p-10 " style={{ height: "1500px" }} >

                    <div className="bg-gray-800 p-3 border-t-4 border-gray-800 h-full" >
                          <div className="image overflow-hidden">
                              <img className="h-30px w-30px mx-auto"
                                  src={profile}
                                  alt=""/>
                          </div>
                          <h1 className="text-white font-bold text-xl leading-8 my-1">{text.name}</h1>
                          <h3 className="text-[#e2e8f0] font-lg text-semibold leading-6">{text.Faculty}</h3>
                          <p className="text-sm text-[#e2e8f0] hover:text-gray-600 leading-6">Year : {text.year}</p>
                          <ul
                              className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                              <li className="flex items-center py-3">
                                <span>Email : </span>
                                  <span className="ml-auto">{text.Email}</span>
                              </li>
                              <li className="flex items-center py-3">
                                  <span>ID : </span>
                                  <span className="ml-auto">{text.student_id}</span>
                              </li>
                          </ul>
                          <br />
                          <div className="flex items-center space-x-3 font-semibold text-white text-xl leading-8">
                              
                              <span>GPAX: 4.00</span>
                            
                              
                          </div>
                    </div>
                   
                    
            
                  
         
         </div>
                

                
                {/* <!-- End of profile card --> */}
        
            {/* <-- Right Side --> */}
            <div className="w-full md:w-9/12 mx-2 h-64">
                {/* <!-- Profile tab -->*/}
                <div className="ml-10 mt-10 bg-[#f1f5f9] p-3 shadow-sm rounded-sm">
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span className="tracking-wide ml-2">1st Term</span>
                    </div>
                  

{/* <---table----> */}



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

                                  <div class ='flex flex-row-reverse mr-10 pt-1'>
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
                                <div class ='flex flex-row-reverse mr-10 pt-1'>
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
                                <div class ='flex flex-row-reverse mr-10 pt-1'>
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
                                <div class ='flex flex-row-reverse mr-10 pt-1'>
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
              




{/* <----Endtable-----> */}
{/* <---table2----> */}


    
                {/* <!-- Profile tab -->*/}
                <div className="">
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

                                  <div class ='flex flex-row-reverse mr-10 pt-1'>
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
                                <div class ='flex flex-row-reverse mr-10 pt-1'>
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
                                <div class ='flex flex-row-reverse mr-10 pt-1'>
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
                                <div class ='flex flex-row-reverse mr-10 pt-1'>
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
                      </div>
                    
                

    
                




{/* <----Endtable2-----> */}
{/* <---table2----> */}


    
                {/* <!-- Profile tab -->*/}
                <div className="">
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

                                  <div class ='flex flex-row-reverse mr-10 pt-1'>
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
                                <div class ='flex flex-row-reverse mr-10 pt-1'>
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
                                <div class ='flex flex-row-reverse mr-10 pt-1'>
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
                                <div class ='flex flex-row-reverse mr-10 pt-1'>
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
                      </div>
                    
                

    
                




{/* <----Endtable2-----> */}





              
                

                
                </div>
            </div>
           </div>
        </div>
        
          







        
      </div>
    </HelmetProvider>
  )
}
