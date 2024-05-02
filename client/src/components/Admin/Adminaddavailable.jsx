import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, FieldArray, getIn } from "formik";
import toast, { Toaster } from 'react-hot-toast';
import tw from 'twin.macro';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { addAvailableCourse } from '../../helpers/adminHelper';
import { getAllCourse } from '../../helpers/helper';
import { AvailableSchema } from '../../Validations/validation';
import Headeradmin from './Headeradmin';

const Fill = tw.div`flex flex-col items-center`;
const Alert = tw.div`text-red-700 text-sm mt-1`;
export default function Adminaddavailable() {

    const location = useLocation();
    const navigate = useNavigate();
    const [course, setCourse] = useState('');
    const [de, setDe] = useState('');

    useEffect(() => {
        if (location.state) {
            setDe(location.state.department_id);
        } else {
            navigate('/admin/departments');
        }

        const apiCourse = async () => {
            try {
              const courses = await getAllCourse();
              setCourse(courses);

            } catch (error) {
                toast.error('Cannot Get Information');
                console.error(error);
            } 
        };
        apiCourse();
    }, []);

  return (
    <HelmetProvider>
        <div className='container text-lg'>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <Helmet>
                <title>A | AddAvailableC</title>
            </Helmet>
            <Headeradmin/>
            <h3 className='text-center py-4'>Available Course of Department {de}</h3>
            <div className='register-form'>
                <Formik 
                    initialValues={{
                        available : [
                            {
                                course_id: '',
                                year: '',
                                department_id: '',
                                term: '',
                            }
                        ]    
                    }}
                    validationSchema={AvailableSchema}
                    onSubmit={async (values) => {
                        try {
                            values.available[0].department_id = de;
                            const res = await addAvailableCourse(values);
                            toast.success(res.msg);

                        } catch (error) {
                            toast.error('Course has already been registered');
                            console.log(error);
                        }
                    }}  
                >  
                    {({ values, errors, touched }) => (
                        <Form className='flex flex-col items-center text-sm'>
                            <FieldArray name='available'>
                            {({ push, remove }) => (
                                <div>
                                {values.available.map((p, index) => {
                                    const course_id = `available[${index}].course_id`;
                                    const touchedId = getIn(touched, course_id);
                                    const errorId = getIn(errors, course_id);

                                    const year = `available[${index}].year`;
                                    const touchedYear = getIn(touched, year);
                                    const errorYear = getIn(errors, year);

                                    const term = `available[${index}].term`;
                                    const touchedTerm = getIn(touched, term);
                                    const errorTerm = getIn(errors, term);

                                    return (
                                    <div key={index} className='flex flex-row my-3'>
                                        <Fill>
                                            <label for='course'>Course</label>
                                            {
                                                (course.length > 0)  ? (
                                                    <Field id='course' className='rounded-md mx-1 border-2 border-sky-700 w-20' type='text' name={course_id} value={p.course_id} as='select'>
                                                        <option value=''></option>
                                                        {
                                                            course.map((courseList, index) => (
                                                                <option key={index} value={courseList.course_id}>{courseList.course_id}</option>
                                                            ))
                                                        }
                                                    </Field>
                                                ) : (
                                                        <h4>No course Available</h4>
                                                    )
                                            }
                                            {errorId && touchedId && (
                                                <Alert>{errorId}</Alert>
                                            )}
                                        </Fill>
                                        <Fill>
                                            <label for='year'>Year</label>
                                            <Field id='year' className='rounded-md mx-1 border-2 border-sky-700 w-20' type='number' name={year} value={p.year} as='select'>
                                                <option value=''></option>
                                                <option value='1'>1</option>
                                                <option value='2'>2</option>
                                                <option value='3'>3</option>
                                                <option value='4'>4</option>   
                                            </Field>
                                            {errorYear && touchedYear && (
                                                    <Alert>{errorYear}</Alert>
                                            )}
                                        </Fill>
                                        <Fill>
                                            <label for='term'>Semester</label>
                                            <Field id='term' className='rounded-md mx-1 border-2 border-sky-700 w-20' type='number' name={term} value={p.term} as='select'>
                                                <option value=''></option>
                                                <option value='1'>1</option>
                                                <option value='2'>2</option> 
                                            </Field>
                                            {errorTerm && touchedTerm && (
                                                    <Alert>{errorTerm}</Alert>
                                            )}
                                        </Fill>
                                        <button type='button' className='mx-2 px-1 rounded-md border-2 bg-red-500' onClick={() => remove(index)} 
                                            disabled={values.available.length === 1}> X </button>
                                        
                                    </div>
                                    );
                                })}
                                <button className='border-2 bg-yellow-500 px-4 rounded-md' type='button' 
                                onClick={() => push({ course_id: '', department_id: de, year: '', term: '' })}>Add</button>
                                </div>
                            )}
                            </FieldArray>
                            <button type="submit" className="btn border-2 bg-blue-500 rounded-md my-2 px-4">SUBMIT</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    </HelmetProvider>
  )
}


