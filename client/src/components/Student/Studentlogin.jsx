import React from 'react'
import { Formik, Field, Form } from "formik";
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import tw from 'twin.macro';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { loginStudent } from '../../helpers/stuhelper';
import { LoginSchema } from '../../Validations/validation';
import Headerstu from './Headerstu';

const Alert = tw.div`text-red-700 text-sm`;
export default function Studentlogin() {

    const navigate = useNavigate();
  return (
    <HelmetProvider>
        <div className='container text-lg'>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <Helmet>
                <title>Stu | Login</title>
            </Helmet>
            <Headerstu/>
            <h3 className='text-center py-4'>Student Login</h3>
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
                                localStorage.setItem('token', res.username);
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
                        <Form className='flex flex-col items-center '>
                            <Field className='border-2 border-sky-500 rounded-md my-3 w-1/3' type='text' name='username' placeholder='username'></Field>
                            {errors.username && touched.username ? (
                                <Alert>{errors.username}</Alert>
                            ) : null}
                            <Field className='border-2 border-sky-500 rounded-md my-3 w-1/3' type='password' name='password' placeholder='password'></Field>
                            <button type="submit" className="btn border-2 bg-sky-500 rounded-md my-3 w-1/3">SUBMIT</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    </HelmetProvider>
    
  )
}
