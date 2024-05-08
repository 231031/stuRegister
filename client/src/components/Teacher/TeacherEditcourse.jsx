import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';


import Headerteacher from './Headerteacher';


// <----textdropdown----->






export default function TeacherEditcourse() {

    

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
                  <h1 class="text-center text-3xl font-semibold capitalize text-sky dark:text-sky lg:text-4xl">Edit Course</h1>
                  <h2 style={{ textAlign: 'center', marginTop: '0px' }}>KMUTT UNIVERSITY</h2>


                  <div className = 'container mt-3'>
                      <h1  class='text-center  text-gray-600 text-2xl  '>Edit Information & Course Name</h1><br />
                  </div>
                </div>
          </div>

        {/* <---editblock---> */}

        <div class="w-full px-4">
							<div
								class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200">
								<div class="flex-auto p-5 lg:p-10">
									<h4 class="text-2xl mb-4 text-black font-semibold">Update your course here</h4>
									<form id="feedbackForm" action="" method="">
										<div class="relative w-full mb-3">
											<label class="block uppercase text-gray-700 text-xs font-bold mb-2" >Name</label>
                                            <input type="email" name="email" id="email" class="border-0 px-3 py-3 rounded text-sm shadow w-fullbg-gray-300 placeholder-black text-gray-800 outline-none focus:bg-gray-400"   required />
                                        </div>
										<div class="relative w-full mb-3">
											<label class="block uppercase text-gray-700 text-xs font-bold mb-2" >Description</label>
                                            <textarea maxlength="300" name="feedback" id="feedback" rows="4"
                                                cols="80"
                                                class="border-0 px-3 py-3  placeholder-black text-gray-800 rounded text-sm shadow focus:outline-none w-full"
                                                placeholder="" required>
                                                
                                            </textarea>
										</div>
										<div class="text-center mt-6">
											<button id="feedbackBtn" class="bg-sky text-white text-center mx-auto active:bg-gray-400 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" mtype="submit" >Submit
                                            </button>
										</div>
									</form>
								</div>
							</div>
						</div>
        





      
      
      
      </div>
      
      
    </div>

  )
}
