import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from "formik";
import tw from 'twin.macro';
import { Toaster } from 'react-hot-toast';
import toast from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { updateTeacher } from '../../helpers/teacherHelper';
import { PersonalSchema } from '../../Validations/validation';

import Headerteacher from "./Headerteacher";
import { getCourseTeacher, getInfoTeacher } from '../../helpers/teacherHelper';

const Alert = tw.div`text-red-700 text-sm`;
export default function Teacherpersonal() {

  const navigate = useNavigate();
  const [data, setData] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/teacher/login");
    }

    const apiInfo = async () => {
      try {
        const res = await getInfoTeacher(localStorage.getItem("token"));
        setData(res);
      } catch (error) {
        toast.error("Cannot Get Information");
        console.error(error);
      }
    };
    apiInfo();
  }, []);

  return (
    <HelmetProvider>
      <div>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <Helmet>
            <title>T | FillPersonal</title>
        </Helmet>
        <Headerteacher data={data}/>
        <div className="container px-2 py-24 mx-auto">
        <div id="feedbackModal" className="feedbackModal">
          <div className="modalContent">
            <h1 className="text-center text-3xl font-semibold capitalize text-sky dark:text-sky lg:text-4xl">
              Edit 
            </h1>
            <h2 style={{ textAlign: "center", marginTop: "0px" }}>
              Your Information
            </h2>

            {/* <div className="container mt-3">
              <h1 className="text-center  text-gray-600  ">
                Enhancing Your Learning Journey: Manage My Course
              </h1>
              <br />
            </div> */}
          </div>
        </div>

        {/* <----table------> */}

        <div className="grid-cols-2">
          <div className=" pt-10 overflow-x-auto sm:mx-0.5 lg:mx-0.5">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-sky border-b">
                      <tr>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Your old Information
                        </th>

                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      <Formik
                      initialValues={{
                        teacher_id: '',
                        firstName: '',
                        lastName: '',
                        salary: '',
                    }}
                    validationSchema={PersonalSchema}
                    onSubmit={async (values) => {
                        try {
                            values.teacher_id = localStorage.getItem('token');
                            const res = await updateTeacher(values);
                            navigate('/teacher/home');
                            toast.success(res.msg);
                        } catch (error) {
                            toast.error('Teacher registration was failed');
                            console.error(error);
                        }
                    }} >{({ errors, touched }) => (
                          <tr
                            className="bg-slate-100 border-b transition duration-300 ease-in-out hover:bg-gray-100"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Name
                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              information
                            </td>

                            <div class="flex flex-row-reverse mr-10 pt-1">
                              <Form
                                className="bg-white hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border-3 border-lowbrown hover:border-transparent rounded mr-1"
                              ><Field className='border-1 border-darkbrown rounded-md my-3 bg-gray' type='text' name='firstName' placeholder='New information'></Field>
                              {errors.firstName && touched.firstName ? (
                                  <Alert>{errors.firstName}</Alert>
                              ) : null}
                              </Form>

                              {/* <Form
                                className="bg-lowbrown hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border border-[#94a3b8] hover:border-transparent rounded mr-1"
                              >
                                Submit Score
                              </Form>

                              <Form
                                className="bg-[#9ca3af] hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border border-[#94a3b8] hover:border-transparent rounded mr-1"
                              >
                                Infomation
                              </Form> */}
                            </div>
                          </tr>
                    )}
                        </Formik>
                    </tbody>
                  </table>
                  </div>
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <button type="submit" className="btn border-2 bg-lowbrown text-white rounded-md my-3 w-1/5 ">SUBMIT</button> 
          </div>
      </div>
        {/* <h3 className='text-center py-4'>Teacher Personal Information</h3>
            <div className='register-form'>
                <Formik 
                    initialValues={{
                        teacher_id: '',
                        firstName: '',
                        lastName: '',
                        salary: '',
                    }}
                    validationSchema={PersonalSchema}
                    onSubmit={async (values) => {
                        try {
                            values.teacher_id = localStorage.getItem('token');
                            const res = await updateTeacher(values);
                            navigate('/teacher/home');
                            toast.success(res.msg);
                        } catch (error) {
                            toast.error('Teacher registration was failed');
                            console.error(error);
                        }
                    }}  
                >  
                    {({ errors, touched }) => (
                        <Form className='flex flex-col items-center '>
                            <Field className='border-2 border-sky-500 rounded-md my-3 w-1/3' type='text' name='firstName' placeholder='first name'></Field>
                            {errors.firstName && touched.firstName ? (
                                <Alert>{errors.firstName}</Alert>
                            ) : null}
                            <Field className='border-2 border-sky-500 rounded-md my-3 w-1/3' type='text' name='lastName' placeholder='last name'></Field>
                            {errors.lastName && touched.lastName ? (
                                <Alert>{errors.lastName}</Alert>
                            ) : null}
                            <Field className='border-2 border-sky-500 rounded-md my-3 w-1/3' type='number' name='salary' placeholder='salary'></Field>
                            {errors.salary && touched.salary ? (
                                <Alert>{errors.salary}</Alert>
                            ) : null}

                            <button type="submit" className="btn border-2 bg-green-500 rounded-md my-3 w-1/3">SUBMIT</button>
                        </Form>
                    )}
                </Formik>
            </div> */}
      </div>
    </HelmetProvider>
  )
}
