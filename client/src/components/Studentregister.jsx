import React from 'react'
import { Formik, Field, Form } from "formik";
import { Link } from 'react-router-dom';
import tw from 'twin.macro';
import { Toaster } from 'react-hot-toast';
import toast from "react-hot-toast";
import { StudentSchema } from '../Validations/validation';
import { registerStudent } from '../helpers/stuhelper';

const Alert = tw.div`text-red-700 text-sm`;
export default function Studentregister() {

  return (
    <div className='container text-lg'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <h3 className='text-center py-4'>Student Registration</h3>
        <div className='register-form'>
            <Formik 
                initialValues={{
                    student_id: '',
                    firstName: '',
                    lastName: '',
                    password: '',
                }}
                validationSchema={StudentSchema}
                onSubmit={async (values) => {
                    try {
                        const res = await registerStudent(values);
                        toast.success('Registration was successfully');

                    } catch (error) {
                        toast.error('Student registration was failed');
                        console.error(error);
                    }
                }}  
            >  
                {({ errors, touched }) => (
                    <Form className='flex flex-col items-center '>
                        <Field className='border-2 border-sky-500 rounded-md my-3 w-1/3' type='text' name='student_id' placeholder='student_id'></Field>
                        {errors.student_id && touched.student_id ? (
                            <Alert>{errors.student_id}</Alert>
                        ) : null}
                        <Field className='border-2 border-sky-500 rounded-md my-3 w-1/3' type='text' name='firstName' placeholder='firstName'></Field>
                        {errors.firstName && touched.firstName ? (
                            <Alert>{errors.firstName}</Alert>
                        ) : null}
                        <Field className='border-2 border-sky-500 rounded-md my-3 w-1/3' type='text' name='lastName' placeholder='lastname'></Field>
                        {errors.lastName && touched.lastName ? (
                            <Alert>{errors.lastName}</Alert>
                        ) : null}
                        <Field className='border-2 border-sky-500 rounded-md my-3 w-1/3' type='password' name='password' placeholder='password'></Field>
                        {errors.password && touched.password ? (
                            <Alert>{errors.password}</Alert>
                        ) : null}
                        <Link to='/student/login' className='text-sm text-red-800'>log in ?</Link>
                        <button type="submit" className="btn border-2 bg-green-500 rounded-md my-3 w-1/3">SUBMIT</button>
                    </Form>
                )}
            </Formik>
        </div>
    </div>
  )
}


