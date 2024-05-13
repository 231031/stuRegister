import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from "formik";
import tw from 'twin.macro';
import { Toaster } from 'react-hot-toast';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { updateTeacher } from '../../helpers/teacherHelper';
import { PersonalSchema } from '../../Validations/validation';

import Headerteacher from "./Headerteacher";
import { getInfoTeacher } from '../../helpers/teacherHelper';

const Alert = tw.div`text-red-700 text-sm`;
export default function Teacherpersonal() {

  const navigate = useNavigate();
  const [data, setData] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/teacher/login");
    }

    const apiInfo = async () => {
      try {
        const res = await getInfoTeacher(localStorage.getItem("token"));
        setData(res);
      } catch (error) {
        toast.error("Cannot Get Information");
        console.error(error);
      }
    };
    apiInfo();
  }, []);

  return (
    <HelmetProvider>
      <div>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <Helmet>
            <title>T | FillPersonal</title>
        </Helmet>
        <Headerteacher data={data}/>
        <h3 className='text-center py-4'>Teacher Personal Information</h3>
            <div className='register-form'>
                <Formik 
                    initialValues={{
                        teacher_id: '',
                        firstName: '',
                        lastName: '',
                        salary: '',
                    }}
                    validationSchema={PersonalSchema}
                    onSubmit={async (values) => {
                        try {
                            values.teacher_id = localStorage.getItem('token');
                            const res = await updateTeacher(values);
                            navigate('/teacher/home');
                            toast.success(res.msg);
                        } catch (error) {
                            toast.error('Teacher registration was failed');
                            console.error(error);
                        }
                    }}  
                >  
                    {({ errors, touched }) => (
                        <Form className='flex flex-col items-center '>
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
    </HelmetProvider>
  )
}
