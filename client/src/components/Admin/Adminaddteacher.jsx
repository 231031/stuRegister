import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, FieldArray, getIn } from "formik";
import tw from 'twin.macro';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { TeacherSchema } from '../../Validations/validation';
import { addTeacher } from '../../helpers/adminHelper';
import Headeradmin from './Headeradmin';

const Alert = tw.div`text-red-700 text-sm`;
export default function Adminaddteacher() {

    const navigate = useNavigate();
    const location = useLocation();
    const [de, setDe] = useState('');

    useEffect(() => {
        if (location.state) {
            setDe(location.state.department_id);
        }    
        else navigate('/admin/departments');
      }, []);

  return (
    <HelmetProvider>
        <div>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <Helmet>
                <title>A | AddTeacher</title>
            </Helmet>
            <Headeradmin/>
            <h3 className='text-lg text-center py-2'>Teacher Registration</h3>
            <h4 className='text-lg text-center'>Department of {de}</h4>
            <div className='register-form'>
                <Formik 
                    initialValues={{
                        teacher : [
                            {
                                department_id: '',
                                first_name: '',
                                last_name: '',
                                teacher_id: '',
                                position: '',
                            }
                        ]    
                    }}
                    validationSchema={TeacherSchema}
                    onSubmit={async (values) => {
                        try {
                            values.teacher[0].department_id = de;
                            const res = await addTeacher(values);
                            toast.success(res.msg);

                        } catch (error) {
                            toast.error('Teacher has already been registered');
                            console.log(error);
                        }
                    }}  
                >  
                     {({ values, touched, errors }) => (
                        <Form className='flex flex-col items-center w-full text-sm'>
                        
                        <FieldArray name="teacher">
                            {({ push, remove }) => (
                            <div>
                                {values.teacher.map((p, index) => {
                                const first_name = `teacher[${index}].first_name`;
                                const touchedFirst = getIn(touched, first_name);
                                const errorFirst = getIn(errors, first_name);

                                const last_name = `teacher[${index}].last_name`;
                                const touchedLast = getIn(touched, last_name);
                                const errorLast = getIn(errors, last_name);

                                const teacher_id = `teacher[${index}].teacher_id`;
                                const touchedId = getIn(touched, teacher_id);
                                const errorId = getIn(errors, teacher_id);

                                const position = `teacher[${index}].position`;
                                const touchedPos = getIn(touched, position);
                                const errorPos = getIn(errors, position);

                                return (
                                    <div key={index} className='flex flex-wrap flex-row my-4'>
                                        <div className='flex flex-col'>
                                            <Field className='rounded-md my-2 mx-1 border-2 border-sky' 
                                                    type='text' name={first_name} value={p.first_name} placeholder='First Name'></Field>
                                            {errorFirst && touchedFirst && (
                                                <Alert>{errorFirst}</Alert>
                                                )}
                                        </div>
                                        <div className='flex flex-col'>
                                            <Field className='rounded-md my-2 mx-1 border-2 border-sky' 
                                                    type='text' name={last_name} value={p.last_name} placeholder='Last Name'></Field>
                                            {errorLast && touchedLast && (
                                                <Alert>{errorLast}</Alert>
                                                )}
                                        </div>

                                        <div className='flex flex-col'>
                                            <Field className='rounded-md my-2 mx-1 border-2 border-sky' 
                                                    type='text' name={teacher_id} value={p.teacher_id} placeholder='Teacher ID'></Field>
                                            {errorId && touchedId && (
                                                <Alert>{errorId}</Alert>
                                                )}
                                        </div>

                                        <div className='flex flex-col'>
                                            <Field className='rounded-md my-2 mx-1 border-2 border-sky' 
                                                    type='text' name={position} value={p.position} placeholder='Position'></Field>
                                            {errorPos && touchedPos && (
                                                <Alert>{errorPos}</Alert>
                                            )}
                                        </div>
                                        
                                        <button type='button' className='px-1 rounded-md border-2 border-red-700' onClick={() => remove(index)} 
                                            disabled={values.teacher.length === 1}> X </button>
                                    
                                    </div>
                                );
                                })}
                                
                                <button className='border-2 bg-blue-500 px-4 rounded-md' type='button' 
                                onClick={() => push({ first_name: '', last_name: '', department_id: de, teacher_id: '', position: '' })}>Add</button>
                            </div>
                            )}
                        </FieldArray>
                        <button className='border-2 bg-green-500 px-4 rounded-md' type="submit">submit</button>
                        </Form>
            )}
                </Formik>
            </div>
        </div>
    </HelmetProvider>
  )
}
