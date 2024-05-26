import React, { useEffect, useState } from 'react'
import { Formik, Field, Form } from "formik";
import tw from 'twin.macro';
import { Toaster } from 'react-hot-toast';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { PasswordSchema } from '../../Validations/validation';
import { updatePassword } from '../../helpers/stuhelper';

// reset password for first login and link to fill personal information (Studentpersonal) after reset
const Alert = tw.div`text-red-700 text-sm`;
export default function Studentnewpass() {
    const navigate = useNavigate();
    const [id, setId] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const [department_id, year, student_id] = token.split('-');
        setId(student_id);
        if (!token) {
            navigate('/student/login');
        }
    }, []);
    
  return (
    <HelmetProvider>
        <div className='flex justify-center flex-col h-screen bg-white items-center'>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <Helmet>
            <title>Stu | FillPassword</title>
            </Helmet>
            {/* <h3 className='text-center py-5 text-4xl text-bold'>Student New Password</h3> */}
            <div className='register-form'>
                <Formik 
                    initialValues={{
                        password: '',
                        newPassword: '',
                    }}
                    validationSchema={PasswordSchema}
                    onSubmit={async (values) => {
                        try {

                            values.student_id = id;
                            const res = await updatePassword(values);
                            navigate('/student/register');
                            toast.success(res.msg);
                        } catch (error) {
                            toast.error('Student registration was failed');
                            console.error(error);
                        }
                    }}  
                >  
                    {({ errors, touched }) => (
                        <div className='flex justify-center  bg-sky rounded-xl p-10'>
                            <Form>
                            <div className='text-3xl flex justify-center mb-4 text-darkgreen '>Student New Password</div>
                                <div className='flex flex-col w-96'>
                                {/* <div className='text-4xl flex justify-center mb-4 text-darkgreen '>Student New Password</div> */}
                                    <Field className='my-3 p-5 w-full h-16 rounded-xl bg-white hover:placeholder:text-slate-50 hover:outline-none hover:ring hover:bg-darkgreen hover:ring-darkgreen
                                                      focus:outline-none focus:ring focus:bg-gray-50 focus:ring-darkgreen focus:placeholder:text-gray-500' type='password' name='password' placeholder='new password'></Field>
                                    <div className='flex justify-end pr-6'>
                                        {errors.password && touched.password ? (
                                            <Alert>{errors.password}</Alert>
                                        ) : null}
                                    </div>
                                    <Field className='my-3 p-5 w-full h-16 rounded-xl bg-white hover:placeholder:text-slate-50 hover:outline-none hover:ring hover:bg-darkgreen hover:ring-darkgreen
                                                      focus:outline-none focus:ring focus:bg-gray-50 focus:ring-darkgreen focus:placeholder:text-gray-500' type='password' name='newPassword' placeholder='confirm password'></Field>
                                    <div className='flex justify-end pr-6'>
                                        {errors.newPassword && touched.newPassword ? (
                                            <Alert>{errors.newPassword}</Alert>
                                        ) : null}
                                    </div>
                                </div>
                                <div className='flex justify-center'>
                                        <button type="submit" className="my-3 w-1/3 h-10 rounded-xl hover:bg-lowyellow hover:text-darkgreen text-lowyellow bg-darkgreen ">Reset</button>
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


