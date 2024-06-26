import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Field, FieldArray, Form, Formik, getIn } from "formik";
import tw from 'twin.macro';
import { Toaster } from 'react-hot-toast';
import toast from "react-hot-toast";
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { AddStuSchema } from '../../Validations/validation';
import { addStudent } from '../../helpers/adminHelper';
import { getDeTeacherAc } from '../../helpers/adminHelper';
import Headeradmin from './Headeradmin';

const Alert = tw.div`text-red-700 text-sm`;
export default function Adminaddstu() {

    const navigate = useNavigate();
    const location = useLocation();
    const [de, setDe] = useState("");
    const [teacher, setTeacher] = useState("");
    const [selTeacher, setSelTeacher] = useState("");

    useEffect(() => {
        if (location.state) {
            const { department_id } = location.state;
            setDe(department_id);
        }    
        else navigate('/admin/seldepartment');

        
        
      }, []);
       
    useEffect(() => {
        const apiTeacher = async () => {
            try {
              const tech = await getDeTeacherAc(de);
              setTeacher(tech);

            } catch (error) {
                toast.error('Cannot Get Information');
                console.error(error);
            } 
        };
        if (de) apiTeacher();
        
    }, [de])

    // function filterDe(e) {
    //     console.log(e)
    //     const filteredData = de.filter(deList => deList.faculty_id === e);
    //     setSel(filteredData);
    // }

  return (
    <HelmetProvider>
        <div>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <Helmet>
                <title>A | AddStudent</title>
            </Helmet>
            <Headeradmin/>
            <h3 className='text-center py-4 text-lg'>Student Registration</h3>
            <div className='flex flex-col items-center w-full text-sm'>
                <p>Teacher</p>
                {   
                    (teacher.length > 0)  ? (
                            <select className='border-2 border-sky rounded-md my-3 w-1/3' 
                            type='text'  id='teacher_id' onChange={(e)=>setSelTeacher(e.target.value)}>
                                <option value=''></option>
                                {
                                    teacher.map((teacherList, index) => (
                                        <option key={index} value={teacherList.teacher_id}>{teacherList.teacher_id}</option>
                                    ))
                                }
                            </select> 
                            

                        ) : (
                                <h4>No teacher Available</h4>
                            )
                        
                }
            </div>
            
            <Formik
            initialValues={{
                student: [
                    {
                        first_name: '',
                        last_name: '',
                        department_id: '',
                        teacher_id: '',
                    }
                ]
            }}
            validationSchema={AddStuSchema}
            onSubmit={async (values) => {
                try {
                    values.student[0].department_id = de;
                    values.student[0].teacher_id = selTeacher;
                    const res = await addStudent(values);
                    toast.success(res.msg);
                } catch (error) {
                    toast.error('Duplicate Add');
                    console.log(error);
                }
            }}
            >
            {({ values, touched, errors }) => (
                <Form className='flex flex-col items-center w-full text-sm'>
                
                <FieldArray name="student">
                    {({ push, remove }) => (
                    <div>
                        {values.student.map((p, index) => {
                        const first_name = `student[${index}].first_name`;
                        const touchedFirst = getIn(touched, first_name);
                        const errorFirst = getIn(errors, first_name);

                        const last_name = `student[${index}].last_name`;
                        const touchedLast = getIn(touched, last_name);
                        const errorLast = getIn(errors, last_name);

                        {/* const teacher_id = `student[${index}].teacher_id`; */}

                        return (
                            <div key={index} className='flex flex-row my-4'>
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
                                
                                <button type='button' className='px-1 rounded-md border-2 border-red-700' onClick={() => remove(index)} 
                                    disabled={values.student.length === 1}> X </button>
                            
                            </div>
                        );
                        })}
                        
                        <button className='border-2 bg-blue-500 px-4 rounded-md' type='button' 
                        onClick={() => push({ first_name: '', last_name: '', department_id: de, teacher_id: selTeacher })}>Add</button>
                    </div>
                    )}
                </FieldArray>
                <button className='border-2 bg-green-500 px-4 rounded-md' type="submit">submit</button>
                </Form>
            )}
            </Formik>
        </div>
    </HelmetProvider>
  )
}

{/* <div className='register-form'>
                <Formik 
                    initialValues={{
                        year: '',
                        department_id: '',
                        number: '',
                        teacher_id: '',
                    }}
                    validationSchema={AddStuSchema}
                    onSubmit={async (values) => {
                        try {
                            values.department_id = de;
                            const res = await addStudent(values);
                            toast.success(res.msg);

                        } catch (error) {
                            toast.error('Student registration was failed');
                            console.error(error);
                        }
                    }}  
                >  
                {({ errors, touched }) => (
                    <Form className='flex flex-col items-center '>
                        <Field className='border-2 border-sky-500 rounded-md my-3 w-1/3' type='number' name='year' placeholder='year - XX' required></Field>
                        {errors.year && touched.year ? (
                            <Alert>{errors.year}</Alert>
                        ) : null}
                        {
                            (teacher.length > 0)  ? (
                                <Field className='border-2 border-sky-500 rounded-md my-3 w-1/3' type='text' name='teacher_id' as='select'>
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
                        {errors.teacher_id && touched.teacher_id ? (
                            <Alert>{errors.teacher_id}</Alert>
                        ) : null}
                        <Field className='border-2 border-sky-500 rounded-md my-3 w-1/3' type='number' name='number' placeholder='number' required></Field>
                        {errors.number && touched.number ? (
                            <Alert>{errors.number}</Alert>
                        ) : null}
                        <button type="submit" className="btn border-2 bg-green-500 rounded-md my-3 w-1/3">SUBMIT</button>
                    </Form>
                )}
                    
                </Formik>
            </div> */}
