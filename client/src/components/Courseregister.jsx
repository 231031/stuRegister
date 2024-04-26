import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, FieldArray, getIn } from "formik";
import tw from 'twin.macro';
import toast, { Toaster } from 'react-hot-toast';
import { CourseSchema } from '../Validations/validation';
import { addCourse } from '../helpers/adminHelper';
import { getDepartment } from '../helpers/helper';

const Alert = tw.div`text-red-700 text-sm`;
export default function Courseregister() {
    const [data, setData] = useState("");

    useEffect(() => {
      const apiCall = async () => {
        try {
          const res = await getDepartment();
          setData(res);
        } catch (error) {
            toast.error('Cannot Get Information');
            console.error(error);
        } 
      };
      apiCall();
    }, []);

  return (
    <div className='container text-lg'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
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
                        }
                    ]    
                }}
                validationSchema={CourseSchema}
                onSubmit={async (values) => {
                    try {
                        const res = await addCourse(values);
                        toast.success(res.msg);

                    } catch (error) {
                        toast.error('Course has already been registered');
                        console.log(error);
                    }
                }}  
            >  
                {({ values, errors, touched }) => (
                    <Form className='flex flex-col items-center '>
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

                                return (
                                <div key={index} className='flex flex-row my-4'>
                                    <div className='flex flex-col'>
                                        <Field className='rounded-md my-2 mx-1 border-2 border-sky-700' 
                                        name={course_id} value={p.course_id} placeholder='Course ID - XXX000'></Field>
                                        {errorId && touchedId && (
                                            <Alert>{errorId}</Alert>
                                            )}
                                    </div>
                                    <div className='flex flex-col'>
                                        <Field className='rounded-md my-2 mx-1 border-2 border-sky-700' 
                                        name={courseName} value={p.courseName} placeholder='Course Name'></Field>
                                        {errorName && touchedName && (
                                            <Alert>{errorName}</Alert>
                                        )}
                                    </div>
                                    {
                                        (data.length > 0)? (
                                            <div className='flex flex-col'>
                                            <Field className='rounded-md my-2 mx-1 border-2 border-sky-700' 
                                            as="select" value={p.department_id} name={department_id} placeholder='department'>
                                            {
                                                data.map((deList, index) => (
                                                    <option  value={deList.department_id} key={index}>
                                                        {deList.department_id}
                                                    </option>
                                                ))
                                            }
                                            </Field>
                                            </div>
                                        ) : (
                                            <h4>Not have Department Available</h4>
                                        )
                                        
                                    }
                                    <div className='flex flex-col'>
                                        <Field className='rounded-md my-2 mx-1 border-2 border-sky-700' 
                                        name={credit} value={p.credit} placeholder='credit'></Field>
                                        {errorCredit && touchedCredit && (
                                            <Alert>{errorCredit}</Alert>
                                        )}
                                    </div>
                                    <button type='button' className='px-1 rounded-md border-2 border-red-700' onClick={() => remove(index)} 
                                        disabled={values.course.length === 1}> X </button>
                                    
                                </div>
                                );
                            })}
                            <button className='border-2 border-blue-500 px-4 rounded-md' type='button' 
                            onClick={() => push({ course_id: '', courseName: '', department_id: '', credit: '' })}>Add</button>
                            </div>
                        )}
                        </FieldArray>
                        <button type="submit" className="btn border-2 bg-blue-500 rounded-md my-2 px-4">SUBMIT</button>
                    </Form>
                )}
            </Formik>
        </div>
    </div>
  )
}
