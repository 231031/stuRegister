import React from 'react';
import { Navigate } from 'react-router-dom';
import { Formik, Field, Form } from "formik";
import tw from 'twin.macro';
import { Toaster } from 'react-hot-toast';
import toast from "react-hot-toast";

import { editCourse } from '../../helpers/adminHelper';

const Alert = tw.div`text-red-700 text-sm`;
export default function Courseedit() {

  return (
    <div className='container text-lg'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <h3 className='text-center py-4'>Update Profile</h3>
        <div className='register-form'>
            <Formik 
                initialValues={{
                    course_id: '',
                }}
                onSubmit={async (values) => {
                    try {
                        const res = await editCourse(values);
                        if (res) toast.success(res.msg);
                    } catch (error) {
                        toast.error('Update was failed');
                        console.log(error);
                    }
                }}  
            >  
                {({ errors, touched }) => (
                    <Form className='flex flex-col items-center '>
                        <Field className='border-2 border-sky-500 rounded-md my-3 w-1/3' type='text' name='course_id' placeholder='First Name'></Field>
                        {errors.course_id && touched.course_id ? (
                            <Alert>{errors.course_id}</Alert>
                        ) : null}
                        {/* <Field className='border-2 border-sky-500 rounded-md my-3 w-1/3' type='text' name='lastName' placeholder='Last Name'></Field>
                        {errors.lastName && touched.lastName ? (
                            <Alert>{errors.lastName}</Alert>
                        ) : null} */}
                        <button type="submit" className="btn border-2 bg-green-500 rounded-md my-3 w-1/3">SUBMIT</button>
                    </Form>
                )}
            </Formik>
        </div>
    </div>
  )
}
