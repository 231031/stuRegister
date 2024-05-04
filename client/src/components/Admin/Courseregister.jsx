import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, FieldArray, getIn } from "formik";
import tw from 'twin.macro';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { CourseSchema } from '../../Validations/validation';
import { addCourse, getDeTeacher } from '../../helpers/adminHelper';
import Headeradmin from './Headeradmin';

const Alert = tw.div`text-red-700 text-sm`;
const Fill = tw.div`flex flex-col items-center`;
export default function Courseregister() {

    const navigate = useNavigate();
    const location = useLocation();
    const [teacher, setTeacher] = useState("");
    const [de, setDe] = useState('');

    useEffect(() => {
        if (location.state) {
            setDe(location.state.department_id);
        }

        else navigate('/admin/departments');
    }, [])

    useEffect(() => {
      const apiTeacher = async () => {
        try {
          const res = await getDeTeacher(de);
          setTeacher(res);
        } catch (error) {
            toast.error('Cannot Get Information');
            console.error(error);
        } 
      };
      if (de) apiTeacher();
    }, [de]);

  return (
    <HelmetProvider>
        <div className='container text-lg'>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <Helmet>
                <title>A | AddCourse</title>
            </Helmet>
            <Headeradmin/>
            <h3 className='text-center py-4'>Course Registration</h3>
            <div className='register-form'>
                <Formik 
                    initialValues={{
                        course : [
                            {
                                course_id: '',
                                courseName: '',
                                department_id: '',
                                credit: '',
                                type: '',
                            }
                        ]    
                    }}
                    validationSchema={CourseSchema}
                    onSubmit={async (values) => {
                        try {
                            values.course[0].department_id = de;
                            const res = await addCourse(values);
                            toast.success(res.msg);

                        } catch (error) {
                            toast.error('Course has already been registered');
                            console.log(error);
                        }
                    }}  
                >  
                    {({ values, errors, touched }) => (
                        <Form className='flex flex-col items-center text-sm'>
                            <FieldArray name='course'>
                            {({ push, remove }) => (
                                <div>
                                {values.course.map((p, index) => {
                                    const courseName = `course[${index}].courseName`;
                                    const touchedName = getIn(touched, courseName);
                                    const errorName = getIn(errors, courseName);

                                    const course_id = `course[${index}].course_id`;
                                    const touchedId = getIn(touched, course_id);
                                    const errorId = getIn(errors, course_id);

                                    const credit = `course[${index}].credit`;
                                    const touchedCredit = getIn(touched, credit);
                                    const errorCredit = getIn(errors, credit);

                                    const type = `course[${index}].type`;
                                    const touchedType = getIn(touched, type);
                                    const errorType = getIn(errors, type);

                                    return (
                                    <div key={index} className='flex flex-row my-2'>
                                        <Fill>
                                            <Field className='rounded-md mx-1 border-2 border-sky' 
                                            name={course_id} value={p.course_id} placeholder='Course ID - XXX000'></Field>
                                            {errorId && touchedId && (
                                                <Alert>{errorId}</Alert>
                                                )}
                                        </Fill>
                                        <Fill>
                                            <Field className='rounded-md mx-1 border-2 border-sky ' 
                                            name={courseName} value={p.courseName} placeholder='Course Name'></Field>
                                            {errorName && touchedName && (
                                                <Alert>{errorName}</Alert>
                                            )}
                                        </Fill>     
                                        <Fill>
                                            {
                                                (teacher.length > 0)  ? (
                                                    <Field className='rounded-md mx-1 border-2 border-sky-700' type='text' name={teacher_id} value={p.teacher_id} as='select'>
                                                        <option value=''></option>
                                                        {
                                                            teacher.map((teacherList, index) => (
                                                                <option key={index} value={teacherList.teacher_id}>{teacherList.teacher_id}</option>
                                                            ))
                                                        }
                                                    </Field>
                                                ) : (
                                                        <h4>No teacher Available</h4>
                                                    )
                                            }
                                            {errorTeacher && touchedTeacher && (
                                                <Alert>{errorTeacher}</Alert>
                                            )}
                                        </Fill>
                                        
                                        <Fill>
                                            <Field className='rounded-md mx-1 border-2 border-sky-700' 
                                            name={credit} value={p.credit} placeholder='credit'></Field>
                                            {errorCredit && touchedCredit && (
                                                <Alert>{errorCredit}</Alert>
                                            )}
                                        </Fill>
                                        <button type='button' className='px-1 rounded-md border-2 bg-red-500' onClick={() => remove(index)} 
                                            disabled={values.course.length === 1}> X </button>
                                        
                                    </div>
                                    );
                                })}
                                <button className='border-2 bg-yellow-500 px-4 rounded-md' type='button' 
                                onClick={() => push({ course_id: '', courseName: '', department_id: de, credit: '', type: '' })}>Add</button>
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
