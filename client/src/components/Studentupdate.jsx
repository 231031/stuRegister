import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Formik, Field, Form } from "formik";
import tw from 'twin.macro';
import { Toaster } from 'react-hot-toast';
import toast from "react-hot-toast";

import { UpdateSchema } from '../Validations/validation';
import { updateStudent } from '../helpers/stuhelper';

const Alert = tw.div`text-red-700 text-sm`;
export default function Studentupdate() {

    useEffect(() => {
        // fetch student information
    });

    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
        return <Navigate to={'/'} replace={true}></Navigate>
    }

  return (
    <div className='container text-lg'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
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
  )
}
