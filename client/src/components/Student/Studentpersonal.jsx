import React, { useEffect, useState } from 'react'
import { Formik, Field, Form } from "formik";
import tw from 'twin.macro';
import { Toaster } from 'react-hot-toast';
import toast from "react-hot-toast";
import { useNavigate, Navigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Headerstu from './Headerstu';
import { PersonalSchema } from '../../Validations/validation';
import { updateStudent, getInfo } from '../../helpers/stuhelper';

const Alert = tw.div`text-red-700 text-sm`;
export default function Studentpersonal() {

    const navigate = useNavigate();
    const [data, setData] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            return <Navigate to={'/student/login'} replace={true}></Navigate>
        }
        const apiInfo = async () => {
            try {
              const res = await getInfo(localStorage.getItem('token'));
              setData(res);
    
            } catch (error) {
                toast.error('Cannot Get Information');
                console.error(error);
            } 
        };
        apiInfo();
    }, []);

    
  return (
    <HelmetProvider>
        <div className='container text-lg'>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <Helmet>
            <title>Stu | FillPersonal</title>
            </Helmet>
            <Headerstu data={data}/>
            <h3 className='text-center py-4'>Student Personal Information</h3>
            <div className='register-form'>
                <Formik 
                    initialValues={{
                        salary: '',
                        parentFirstName: '',
                        parentLastName: '',
                        parentSalary: '',
                    }}
                    validationSchema={PersonalSchema}
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
                            <Field className='border-2 border-sky-500 rounded-md my-3 w-1/3' type='number' name='salary' placeholder='salary'></Field>
                            {errors.salary && touched.salary ? (
                                <Alert>{errors.salary}</Alert>
                            ) : null}
                            <Field className='border-2 border-sky-500 rounded-md my-3 w-1/3' type='text' name='parentFirstName' placeholder='parent first name'></Field>
                            {errors.parentFirstName && touched.parentFirstName ? (
                                <Alert>{errors.parentFirstName}</Alert>
                            ) : null}
                            <Field className='border-2 border-sky-500 rounded-md my-3 w-1/3' type='text' name='parentLastName' placeholder='parent last name'></Field>
                            {errors.parentLastName && touched.parentLastName ? (
                                <Alert>{errors.parentLastName}</Alert>
                            ) : null}
                            <Field className='border-2 border-sky-500 rounded-md my-3 w-1/3' type='text' name='parentSalary' placeholder='parent salary'></Field>
                            {errors.parentSalary && touched.parentSalary ? (
                                <Alert>{errors.parentSalary}</Alert>
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


