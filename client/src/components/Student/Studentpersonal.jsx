import React from 'react'
import { Formik, Field, Form } from "formik";
import tw from 'twin.macro';
import { Toaster } from 'react-hot-toast';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

import { StudentSchema } from '../../Validations/validation';
import { updateStudent } from '../../helpers/stuhelper';

const Alert = tw.div`text-red-700 text-sm`;
export default function Studentregister() {
    const navigate = useNavigate();
  return (
    <div className='container text-lg'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <h3 className='text-center py-4'>Student Personal Information</h3>
        <div className='register-form'>
            <Formik 
                initialValues={{
                    student_id: '',
                    firstName: '',
                    lastName: '',
                    salary: '',
                    password: '',
                    newPassword: '',
                }}
                validationSchema={StudentSchema}
                onSubmit={async (values) => {
                    try {
                        values.student_id = localStorage.getItem('token');
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
                        <Field className='border-2 border-sky-500 rounded-md my-3 w-1/3' type='text' name='firstName' placeholder='first name'></Field>
                        {errors.firstName && touched.firstName ? (
                            <Alert>{errors.firstName}</Alert>
                        ) : null}
                        <Field className='border-2 border-sky-500 rounded-md my-3 w-1/3' type='text' name='lastName' placeholder='last name'></Field>
                        {errors.lastName && touched.lastName ? (
                            <Alert>{errors.lastName}</Alert>
                        ) : null}
                        <Field className='border-2 border-sky-500 rounded-md my-3 w-1/3' type='number' name='salary' placeholder='salary'></Field>
                        {errors.salary && touched.salary ? (
                            <Alert>{errors.salary}</Alert>
                        ) : null}

                        <button type="submit" className="btn border-2 bg-green-500 rounded-md my-3 w-1/3">SUBMIT</button>
                    </Form>
                )}
            </Formik>
        </div>
    </div>
  )
}


