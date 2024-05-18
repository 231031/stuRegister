import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import tw from 'twin.macro';
import { Toaster } from 'react-hot-toast';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';


import { InfoSchema } from '../../Validations/validation';
import Headerteacher from "./Headerteacher";
import { getInfoTeacher, registerInfomation } from '../../helpers/teacherHelper';

const Alert = tw.div`text-red-700 text-sm`;
export default function Teacherpersonal() {

  const navigate = useNavigate();
  const [data, setData] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return <Navigate to={'/teacher/login'} replace={true}></Navigate>
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

  const formik = useFormik({
    initialValues: {
      email: '',
      phone: '',
      city: '',
      state: '',
      zip_code: '',
      address: '',
    },
    validationSchema: InfoSchema,
    onSubmit: async (values) => {
      try {
        const res = await registerInfomation(values);
        toast.success(res.msg);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <HelmetProvider>
      <div>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <Helmet>
          <title>T | UpdatePersonal</title>
        </Helmet>
        <Headerteacher data={data}/>
        <div className="container px-2 py-24 mx-auto">
          <form onSubmit={formik.handleSubmit}>
            <div id="feedbackModal" className="feedbackModal">
              <div className="modalContent">
                <h1 className="text-center text-3xl font-semibold capitalize text-sky dark:text-sky lg:text-4xl">
                  Edit
                </h1>
                <h2 style={{ textAlign: "center", marginTop: "0px" }}>
                  Your Information
                </h2>
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
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                          >
                            Type
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                          >
                            Your old Information
                          </th>

                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                          >
                            Fill new information
                          </th>
                        </tr>
                      </thead>


                      <tbody>
                        <tr className="bg-slate-100 border-b transition duration-300 ease-in-out hover:bg-gray-100" >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                            Email
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                            <p>{data?.email}</p>
                          </td>

                          <div class="flex flex-row justify-center mr-10 pt-1">
                            <div
                              className="bg-white hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border-3 border-lowbrown hover:border-transparent rounded mr-1"
                            ><input
                              name="email"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.email}
                              className='border-1 border-darkbrown rounded-md my-3 bg-gray ' type='text'  ></input>
                              {formik.touched.email && formik.errors.email ? (
                                <p className="text-red-500 text-xs italic ">{formik.errors.email}</p>
                              ) : null}
                            </div>
                          </div>
                        </tr>

                        <tr className="bg-slate-100 border-b transition duration-300 ease-in-out hover:bg-gray-100 text-center" >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Phone
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {data?.phone}
                          </td>

                          < div class="flex flex-row justify-center mr-10 pt-1">
                            <div
                              className="bg-white hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border-3 border-lowbrown hover:border-transparent rounded mr-1"
                            ><input
                              name="phone"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.phone}
                              className='border-1 border-darkbrown rounded-md my-3 bg-gray' type='text' ></input>
                              {formik.touched.phone && formik.errors.phone ? (
                                <p className="text-red-500 text-xs italic">{formik.errors.phone}</p>
                              ) : null}
                            </div>
                          </div>
                        </tr>

                        <tr className="bg-slate-100 border-b transition duration-300 ease-in-out hover:bg-gray-100 text-center" >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Address
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {data?.address}
                          </td>

                          < div class="flex flex-row justify-center mr-10 pt-1">
                            <div
                              className="bg-white hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border-3 border-lowbrown hover:border-transparent rounded mr-1"
                            ><input
                              name="address"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.address}
                              className='border-1 border-darkbrown rounded-md my-3 bg-gray' type='text' ></input>
                              {formik.touched.address && formik.errors.address ? (
                                <p className="text-red-500 text-xs italic">{formik.errors.address}</p>
                              ) : null}
                            </div>
                          </div>
                        </tr>


                        <tr className="bg-slate-100 border-b transition duration-300 ease-in-out hover:bg-gray-100 text-center" >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            City
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {data?.city}
                          </td>

                          < div class="flex flex-row justify-center mr-10 pt-1">
                            <div
                              className="bg-white hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border-3 border-lowbrown hover:border-transparent rounded mr-1"
                            ><input
                              name="city"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.city}
                              className='border-1 border-darkbrown rounded-md my-3 bg-gray' type='text' ></input>
                              {formik.touched.city && formik.errors.city ? (
                                <p className="text-red-500 text-xs italic">{formik.errors.city}</p>
                              ) : null}
                            </div>
                          </div>
                        </tr>

                        <tr className="bg-slate-100 border-b transition duration-300 ease-in-out hover:bg-gray-100 text-center" >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            State
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {data?.state}
                          </td>

                          < div class="flex flex-row justify-center mr-10 pt-1">
                            <div
                              className="bg-white hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border-3 border-lowbrown hover:border-transparent rounded mr-1"
                            ><input
                              name="state"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.state}
                              className='border-1 border-darkbrown rounded-md my-3 bg-gray' type='text' ></input>
                              {formik.touched.state && formik.errors.state ? (
                                <p className="text-red-500 text-xs italic">{formik.errors.state}</p>
                              ) : null}
                            </div>
                          </div>
                        </tr>

                        <tr className="bg-slate-100 border-b transition duration-300 ease-in-out hover:bg-gray-100 text-center" >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Zip Code
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {data?.zip_code}
                          </td>

                          < div class="flex flex-row justify-center mr-10 pt-1">
                            <div
                              className="bg-white hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border-3 border-lowbrown hover:border-transparent rounded mr-1"
                            ><input
                              name="zip_code"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.zip_code}
                              className='border-1 border-darkbrown rounded-md my-3 bg-gray' type='text' ></input>
                              {formik.touched.zip_code && formik.errors.zip_code ? (
                                <p className="text-red-500 text-xs italic">{formik.errors.zip_code}</p>
                              ) : null}
                            </div>
                          </div>
                        </tr>

                        
                      </tbody>

                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-center'>
              <button type="submit" className="btn border-2 bg-lowbrown text-white rounded-md my-3 w-1/5 ">SUBMIT</button>
            </div>
          </form>
        </div>

      </div>
    </HelmetProvider>
  )
}
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