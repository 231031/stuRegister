import React from 'react';
import { useNavigate } from 'react-router-dom'
import { Formik, Field, Form } from "formik";
import tw from 'twin.macro';
import toast, { Toaster } from 'react-hot-toast';
import { CourseSchema } from '../Validations/validation';
import { addCourse } from '../helpers/adminHelper';

const Alert = tw.div`text-red-700 text-sm`;
export default function Courseregister() {
    const navigate = useNavigate();
  return (
    <div className='container text-lg'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <h3 className='text-center py-4'>Course Registration</h3>
        <div className='register-form'>
            <Formik 
                initialValues={{
                    course_id: '',
                    courseName: '',
                }}
                validationSchema={CourseSchema}
                onSubmit={async (values) => {
                    try {
                        const res = await addCourse(values);
                        toast.success(res.msg);
                        navigate('/admin/adddetail', { state : { course_id : values.course_id} });

                    } catch (error) {
                        toast.error('Course has already been registered');
                        console.log(error);
                    }
                }}  
            >  
                {({ errors, touched }) => (
                    <Form className='flex flex-col items-center '>
                        <Field className='border-2 border-blue-500 rounded-md my-2 w-2/4' type='text' name='course_id' placeholder='Course ID - XXX000'></Field>
                        {errors.course_id && touched.course_id ? (
                            <Alert>{errors.course_id}</Alert>
                        ) : null}
                        <Field className='border-2 border-blue-500 rounded-md my-2 w-2/4' type='text' name='courseName' placeholder='Course Name'></Field>
                        {errors.courseName && touched.courseName ? (
                            <Alert>{errors.courseName}</Alert>
                        ) : null}
                        <button type="submit" className="btn border-2 bg-green-500 rounded-md my-2 w-2/4">SUBMIT</button>
                    </Form>
                )}
            </Formik>
        </div>
    </div>
  )
}
