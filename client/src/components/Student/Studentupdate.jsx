import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from "formik";
import tw from 'twin.macro';
import { Toaster } from 'react-hot-toast';
import toast from "react-hot-toast";
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { UpdateSchema } from '../../Validations/validation';
import { updateStudent } from '../../helpers/stuhelper';
import Headerstu from './Headerstu';
import { useNavigate } from 'react-router-dom';

// for fill parent information ??
const Alert = tw.div`text-red-700 text-sm`;
export default function Studentupdate() {

    const navigate = useNavigate();
    const [data, setData] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/student/login');
        }
        const [department_id, year, student_id] = token.split('-');
        setData({
            department_id: department_id,
            year: year,
            student_id: student_id,
        });
    }, []);

  return (
    <HelmetProvider>
        <div>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <Helmet>
            <title>Stu | UpdateInfo</title>
            </Helmet>
            <Headerstu data={data}/>
            <h3 className='text-center py-4'>Update Profile</h3>
            <div className='register-form'>
                <Formik 
                    initialValues={{
                        firstName: '',
                        lastName: '',
                    }}
                    validationSchema={UpdateSchema}
                    onSubmit={async (values) => {
                        try {
                            const res = await updateStudent(values);
                            if (res) toast.success(res.msg);
                        } catch (error) {
                            toast.error('Update was failed');
                            console.log(error);
                        }
                    }}  
                >  
                    {({ errors, touched }) => (
                        <Form className='flex flex-col items-center '>
                            <Field className='border-2 border-sky-500 rounded-md my-3 w-1/3' type='text' name='firstName' placeholder='First Name'></Field>
                            {errors.firstName && touched.firstName ? (
                                <Alert>{errors.firstName}</Alert>
                            ) : null}
                            <Field className='border-2 border-sky-500 rounded-md my-3 w-1/3' type='text' name='lastName' placeholder='Last Name'></Field>
                            {errors.lastName && touched.lastName ? (
                                <Alert>{errors.lastName}</Alert>
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
