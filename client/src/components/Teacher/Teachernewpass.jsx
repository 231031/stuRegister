import React from 'react'
import { Formik, Field, Form } from "formik";
import tw from 'twin.macro';
import { Toaster } from 'react-hot-toast';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { updateTeacher } from '../../helpers/teacherHelper';
import { PasswordSchema } from '../../Validations/validation';

const Alert = tw.div`text-red-700 text-sm`;
export default function Teachernewpass() {

  const navigate = useNavigate();

  return (
    <HelmetProvider>
      <div className='flex flex-col justify-center h-screen'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <Helmet>
            <title>T | FillPersonal</title>
        </Helmet>
        <h3 className='text-center py-5 text-4xl text-bold'>Teacher New Password</h3>
            <div className='register-form'>
                <Formik 
                    initialValues={{
                        password: '',
                        newPassword: '',
                    }}
                    validationSchema={PasswordSchema}
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
                        <div className='flex justify-center'>
                            <Form>
                                <div className='flex flex-col w-96'>
                                <Field className='my-3 p-5 w-full h-16 rounded-full bg-gray-200 hover:placeholder:text-slate-50 hover:outline-none hover:ring hover:bg-blue-500 hover:ring-blue-500
                                                      focus:outline-none focus:ring focus:bg-gray-50 focus:ring-blue-500 focus:placeholder:text-gray-500' type='password' name='password' placeholder='new password'></Field>
                                    <div className='flex justify-end pr-6'>
                                            {errors.password && touched.password ? (
                                                <Alert>{errors.password}</Alert>
                                            ) : null}
                                    </div>
                                <Field className='my-3 p-5 w-full h-16 rounded-full bg-gray-200 hover:placeholder:text-slate-50 hover:outline-none hover:ring hover:bg-blue-500 hover:ring-blue-500
                                                      focus:outline-none focus:ring focus:bg-gray-50 focus:ring-blue-500 focus:placeholder:text-gray-500' type='password' name='newPassword' placeholder='confirm password'></Field>
                                    <div className='flex justify-end pr-6'>
                                            {errors.newPassword && touched.newPassword ? (
                                                <Alert>{errors.newPassword}</Alert>
                                            ) : null}
                                    </div>
                                </div>
                                <div className='flex justify-center'>
                                        <button type="submit" className="my-3 w-1/3 h-10 rounded-full hover:bg-blue-500 text-white bg-blue-800 ">Login</button>
                                </div>                            
                            </Form>
                        </div>
                    )}
                </Formik>
            </div>
      </div>
    </HelmetProvider>
  )
}
