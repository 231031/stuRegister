import React, { useEffect, useState } from 'react'
import { Formik, Field, Form } from "formik";
import tw from 'twin.macro';
import { Toaster } from 'react-hot-toast';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { PasswordSchema } from '../../Validations/validation';
import { updateStudent } from '../../helpers/stuhelper';

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
        <div className='container text-lg'>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <Helmet>
            <title>Stu | FillPassword</title>
            </Helmet>
            <h3 className='text-center py-4'>Student New Password</h3>
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
                            const res = await updateStudent(values);
                            toast.success(res.msg);
                            navigate('/student/home');

                        } catch (error) {
                            toast.error('Student registration was failed');
                            console.error(error);
                        }
                    }}  
                >  
                    {({ errors, touched }) => (
                        <Form className='flex flex-col items-center '>
                            <Field className='border-2 border-sky-500 rounded-md my-3 w-1/3' type='password' name='password' placeholder='new password'></Field>
                            {errors.password && touched.password ? (
                                <Alert>{errors.password}</Alert>
                            ) : null}
                            <Field className='border-2 border-sky-500 rounded-md my-3 w-1/3' type='password' name='newPassword' placeholder='confirm password'></Field>
                            {errors.newPassword && touched.newPassword ? (
                                <Alert>{errors.newPassword}</Alert>
                            ) : null}

                            <button type="submit" className="btn border-2 bg-green-500 rounded-md my-3 w-1/3">SUBMIT</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    </HelmetProvider>
  )
}


