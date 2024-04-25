import React, { useState, useEffect } from 'react'
import { Formik, Field, Form } from "formik";
import tw from 'twin.macro';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom'
import { DetailSchema } from '../Validations/validation';
import { addDetail } from '../helpers/adminHelper';
import { useNavigate } from 'react-router-dom'

const Alert = tw.div`text-red-700 text-sm`;
export default function Coursedetail() {


    const navigate = useNavigate();
    const location = useLocation();
    const [course_id, setCourse] = useState('');

    useEffect(() => {
        if (location.state) {
            const { course_id } = location.state;
            setCourse(course_id);
        }    
        else navigate('/admin/editcourse');
      }, []);
    
    

  return (
    <div className='container text-lg'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <h3 className='text-center py-4'>Course Registration</h3>
        <div className='register-form'>
            <Formik 
                initialValues={{
                    course_id: '',
                    teacher_id: '',
                    group : '',
                    major: '',
                    count: '',
                    limit: '',
                    startTime: '',
                    finishTime: '',
                    day: '',
                    class_id: '',
                }}
                validationSchema={DetailSchema}
                onSubmit={async (values) => {
                    try {
                        values.course_id = course_id;
                        const res = await addDetail(values);
                        toast.success('Add Detail was successfully');

                    } catch (error) {
                        toast.error('Duplicate Add');
                        console.log(error);
                    }
                }}  
            >  
                {({ errors, touched }) => (
                    <Form className='flex flex-col items-center '>
                        <Field className='border-2 border-blue-500 rounded-md my-2 w-2/4' type='text' name='teacher_id' placeholder='Teacher ID'></Field>
                        {errors.teacher_id && touched.teacher_id ? (
                            <Alert>{errors.teacher_id}</Alert>
                        ) : null}
                        <Field className='border-2 border-blue-500 rounded-md my-2 w-2/4' type='text' name='class_id' placeholder='Class ID'></Field>
                        {errors.class_id && touched.class_id ? (
                            <Alert>{errors.class_id}</Alert>
                        ) : null}
                        <Field className='border-2 border-blue-500 rounded-md my-2 w-2/4' as="select" name="major">
                            <option></option>
                            <option value="thai">Thai</option>
                            <option value="eng">Eng</option>
                        </Field>
                        {errors.major && touched.major ? (
                            <Alert>{errors.major}</Alert>
                        ) : null}
                        <Field className='border-2 border-blue-500 rounded-md my-2 w-2/4' type='number' name='group' placeholder='Group Number'></Field>
                        {errors.group && touched.group ? (
                            <Alert>{errors.group}</Alert>
                        ) : null}
                        <Field className='border-2 border-blue-500 rounded-md my-2 w-2/4' type='number' name='limit' placeholder='Limit Student'></Field>
                        {errors.limit && touched.limit ? (
                            <Alert>{errors.limit}</Alert>
                        ) : null}
                        <Field className='border-2 border-blue-500 rounded-md my-2 w-2/4' as="select" name="day">
                            <option></option>
                            <option value="monday">monday</option>
                            <option value="tuesday">tuesday</option>
                            <option value="wednesday">wednesday</option>
                            <option value="thursday">thursday</option>
                            <option value="friday">friday</option>
                            <option value="saturday">saturday</option>
                            <option value="sunday">sunday</option>
                        </Field>
                        {errors.password && touched.password ? (
                            <Alert>{errors.password}</Alert>
                        ) : null}
                        <Field className='border-2 border-blue-500 rounded-md my-2 w-2/4' type='text' name='startTime' placeholder='Start Time (00:00 - 23:59)'></Field>
                        {errors.password && touched.password ? (
                            <Alert>{errors.password}</Alert>
                        ) : null}
                        <Field className='border-2 border-blue-500 rounded-md my-2 w-2/4' type='text' name='finishTime' placeholder='Finish Time'></Field>
                        {errors.password && touched.password ? (
                            <Alert>{errors.password}</Alert>
                        ) : null}
                        <button type="submit" className="btn border-2 bg-green-500 rounded-md my-2 w-2/4">SUBMIT</button>
                    </Form>
                )}
            </Formik>
        </div>
    </div>
  )
}
