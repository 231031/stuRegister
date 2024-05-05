import React from 'react';
import { Formik, Field, Form } from "formik";
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import tw from 'twin.macro';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { loginTeacher } from '../../helpers/teacherHelper';
import { LoginSchema } from '../../Validations/validation';

const Alert = tw.div`text-red-700 text-sm`;
export default function Teacherlogin() {
  const navigate = useNavigate();
  return (
    <HelmetProvider>
      <div className='flex justify-center flex-col h-screen'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <Helmet>
            <title>T | Login</title>
        </Helmet>
        <h3 className='text-center py-5 text-4xl text-bold'>Teacher Login</h3>
        <div className='register-form'>
                <Formik 
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={async (values) => {
                        try {
                            const res = await loginTeacher(values);
                            console.log(res);
                            if (res === null) toast.error("Username doesn't exist.");
                            else if (res.error) toast.error(res.error);
                            else {
                            if (res) {
                                localStorage.setItem('token', res.username);
                                toast.success(res.msg);
                            
                                if (!res.setPass) {
                                    navigate('/teacher/newpassword');
                                } 
                                else navigate('/teacher/home');
                            }
                            }
                        } catch (error) {
                            toast.error('Login was failed');
                            console.error(error);
                        }
                    }}  
                >  
                    {({ errors, touched }) => (
                        <div className='flex justify-center'>
                        <Form >
                            <div className='flex flex-col w-96'>
                                    <Field className='my-3 p-5 w-full h-16 rounded-full bg-gray-200 hover:placeholder:text-slate-50 hover:outline-none hover:ring hover:bg-blue-500 hover:ring-blue-500
                                                      focus:outline-none focus:ring focus:bg-gray-50 focus:ring-blue-500 focus:placeholder:text-gray-500' type='text' name='username' placeholder='username'></Field>
                                    <div className='flex justify-end pr-6'>
                                        {errors.username && touched.username ? (
                                            <Alert>{errors.username}</Alert>
                                        ) : null}
                                    </div>
                                    <Field className='my-3 p-5 w-full h-16 rounded-full bg-gray-200 hover:placeholder:text-slate-50 hover:outline-none hover:ring hover:bg-blue-500 hover:ring-blue-50
                                                      focus:outline-none focus:ring focus:bg-gray-50 focus:ring-blue-500 focus:placeholder:text-gray-500' type='password' name='password' placeholder='password'></Field>
                                    <div className='flex justify-end pr-6'>
                                        <a href=''>Reset Password</a>
                                    </div>
                                    <div className='flex justify-center'>
                                        <button type="submit" className="my-3 w-1/3 h-10 rounded-full hover:bg-blue-500 text-white bg-blue-800 ">Login</button>
                                    </div>
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
