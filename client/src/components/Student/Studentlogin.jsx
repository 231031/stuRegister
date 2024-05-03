import React from 'react'
import { Formik, Field, Form } from "formik";
import { useNavigate, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import tw from 'twin.macro';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { loginStudent } from '../../helpers/stuhelper';
import { LoginSchema } from '../../Validations/validation';

const Alert = tw.div`text-red-700 text-sm`;
export default function Studentlogin() {

    const navigate = useNavigate();
  return (
    <HelmetProvider>
        <div className='flex justify-center flex-col h-screen'>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <Helmet>
                <title>Stu | Login</title>
            </Helmet>
            <h3 className='text-center py-5 text-3xl' >Student Login</h3>
            <div className='register-form'>
                <Formik 
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={async (values) => {
                        try {
                            const res = await loginStudent(values);
                            console.log(res);
                            if (res === null) toast.error("Username doesn't exist.");
                            else if (res.error) toast.error(res.error);
                            else {
                            if (res) {
                                const token = `${res.department_id}-${res.year}-${res.student_id}`;
                                localStorage.setItem('token', token);
                                toast.success(res.msg);
                            
                                if (!res.setPass) {
                                    navigate('/student/newpassword');
                                } 
                                else navigate('/student/home');
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
                        <Form>
                            <div className='flex flex-col w-96'>
                                    <Field className='my-3 p-5 w-full h-16 rounded-full bg-gray-200 ' type='text' name='username' placeholder='username'></Field>
                                    <div className='flex justify-end pr-6'>
                                        {errors.username && touched.username ? (
                                            <Alert>{errors.username}</Alert>
                                        ) : null}
                                    </div>
                                    <Field className='my-3 p-5 w-full h-16 rounded-full bg-gray-200' type='password' name='password' placeholder='password'></Field>
                                    <div className='flex justify-end pr-6'>
                                        <a href=''>Reset Password</a>
                                    </div>
                                    <div className='flex justify-center'>
                                        <button type="submit" className="my-3 w-1/3 h-10 rounded-full bg-gray-500 text-white ">Login</button>
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