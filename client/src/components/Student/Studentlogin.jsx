import React from 'react'
import { Formik, Field, Form } from "formik";
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import tw from 'twin.macro';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { loginStudent } from '../../helpers/stuhelper';
import { LoginSchema } from '../../Validations/validation';

const Alert = tw.div`text-sm`;
export default function Studentlogin() {

    const navigate = useNavigate();
    return (
        <HelmetProvider>
            <div className='flex justify-center flex-col h-screen bg-darkgreen items-center'>
                <Toaster position='top-center' reverseOrder={false}></Toaster>
                <Helmet>
                    <title>Stu | Login</title>
                </Helmet>
                {/* <h3 className='text-center py-5 text-4xl text-bold text-lowyellow' >Student Login</h3> */}
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
                                if (res.student_id === undefined) toast.error(res.msg);
                                else {
                                    if (res) {
                                        const month = new Date().getMonth()
                                        let stu_year = new Date().getFullYear() + 543 - res.year;
                                        if (month >= 7) stu_year = stu_year + 1;

                                        const token = `${res.department_id}-${stu_year}-${res.student_id}`;
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
                            <div className='flex justify-center  bg-sky rounded-xl p-10 '>
                                <Form>
                                    <div className='flex flex-col w-96 '>
                                        <div className='text-4xl flex justify-center mb-4 text-darkgreen '>Student Login</div>
                                        <Field className='my-3 p-5 w-full h-16 rounded-xl bg-slate-200 hover:placeholder:text-slate-50 hover:outline-none hover:ring hover:bg-darkgreen hover:ring-darkgreen
                                                      focus:outline-none focus:ring focus:bg-gray-50 focus:ring-darkgreen focus:placeholder:text-gray-500' type='text' name='username' placeholder='username'></Field>
                                        <div className='flex justify-end pr-6 text-red-700'>
                                            {errors.username && touched.username ? (
                                                <Alert>{errors.username}</Alert>
                                            ) : null}
                                        </div>
                                        <Field className='my-3 p-5 w-full h-16 rounded-xl bg-slate-200 hover:placeholder:text-slate-50 hover:outline-none hover:ring hover:bg-darkgreen hover:ring-darkgreen
                                                      focus:outline-none focus:ring focus:bg-gray-50 focus:ring-darkgreen focus:placeholder:text-gray-500' type='password' name='password' placeholder='password'></Field>
                                        <div className='flex justify-end pr-6'>
                                            <a href=''>Reset Password</a>
                                        </div>
                                        <div className='flex justify-center '>
                                            <button type="submit" className="my-3 w-1/3 h-10 rounded-xl hover:bg-lowyellow hover:text-darkgreen text-lowyellow bg-darkgreen ">Login</button>
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