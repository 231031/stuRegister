import React, { useEffect, useState } from 'react'
import { Formik, Field, Form } from "formik";
import tw from 'twin.macro';
import { Toaster } from 'react-hot-toast';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Headerstu from './Headerstu';
import { PersonalSchema } from '../../Validations/validation';
import { updateStudent, getInfo } from '../../helpers/stuhelper';

// display information and can edit some information
const Alert = tw.div`text-red-700 text-sm`;
export default function Studenteditpersonal() {

    const navigate = useNavigate();
    const [data, setData] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/student/login');
        }
        const [department_id, year, student_id] = token.split('-');
        
        const apiInfo = async() => {
          try {
            const res = await getInfo(student_id);
            setData(res);
          } catch (error) {
            console.log(error);
          }
        }
        if (student_id) apiInfo();
    }, []);


    
  return (
    <HelmetProvider>
        <div>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <Helmet>
            <title>Stu | EditPersonal</title>
            </Helmet>
            <Headerstu data={data}/>
            <h3 className='text-center py-4'>Student Personal Information</h3>
            <div className='register-form'>
                <Formik 
                    initialValues={{
                        salary: data.salary,
                        parentFirstName: data.parentFirstName,
                        parentLastName: data.parentLastName,
                        parentSalary: data.parentSalary,
                    }}
                    validationSchema={PersonalSchema}
                    onSubmit={async (values) => {
                        try {
                            values.student_id = data.student_id;
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
                            <Field className='border-2 border-sky rounded-md my-3 w-1/3' type='number' name='salary' placeholder='salary'></Field>
                            {errors.salary && touched.salary ? (
                                <Alert>{errors.salary}</Alert>
                            ) : null}
                            <Field className='border-2 border-sky rounded-md my-3 w-1/3' type='text' name='parentFirstName' placeholder='parent first name'></Field>
                            {errors.parentFirstName && touched.parentFirstName ? (
                                <Alert>{errors.parentFirstName}</Alert>
                            ) : null}
                            <Field className='border-2 border-sky rounded-md my-3 w-1/3' type='text' name='parentLastName' placeholder='parent last name'></Field>
                            {errors.parentLastName && touched.parentLastName ? (
                                <Alert>{errors.parentLastName}</Alert>
                            ) : null}
                            <Field className='border-2 border-sky rounded-md my-3 w-1/3' type='text' name='parentSalary' placeholder='parent salary'></Field>
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



