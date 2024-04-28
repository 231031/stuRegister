import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, FieldArray, getIn } from "formik";
import tw from 'twin.macro';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { TeacherSchema } from '../../Validations/validation';
import { addTeacher } from '../../helpers/adminHelper';

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
    <div className='container text-lg'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <h3 className='text-center py-2'>Teacher Registration</h3>
        <h4 className='text-center'>Department of {de}</h4>
        <div className='register-form'>
            <Formik 
                initialValues={{
                    teacher : [
                        {
                            department_id: '',
                            teacher_id: '',
                            password: '',
                        }
                    ]    
                }}
                validationSchema={TeacherSchema}
                onSubmit={async (values) => {
                    try {
                        console.log(de);
                        values.teacher[0].department_id = de;
                        const res = await addTeacher(values);
                        toast.success(res.msg);

                    } catch (error) {
                        toast.error('Teacher has already been registered');
                        console.log(error);
                    }
                }}  
            >  
                {({ values, errors, touched }) => (
                    <Form className='flex flex-col items-center text-sm'>
                        <FieldArray name='teacher'>
                        {({ push, remove }) => (
                            <div>
                            {values.teacher.map((p, index) => {

                                values.teacher[index].password = values.teacher[index].teacher_id;
                                const teacher_id = `teacher[${index}].teacher_id`;
                                const touchedId = getIn(touched, teacher_id);
                                const errorId = getIn(errors, teacher_id);

                                return (
                                <div key={index} className='flex flex-row my-4'>
                                    <div className='flex flex-col'>
                                        <Field className='rounded-md mx-1 border-2 border-sky-700' 
                                        name={teacher_id} value={p.teacher_id} placeholder='teacher ID'></Field>
                                        {errorId && touchedId && (
                                            <Alert>{errorId}</Alert>
                                            )}
                                    </div>
                                    <button type='button' className='px-1 rounded-md border-2 border-red-700' onClick={() => remove(index)} 
                                        disabled={values.teacher.length === 1}> X </button>
                                    
                                </div>
                                );
                            })}
                            <button className='border-2 bg-sky-500 px-4 rounded-md' type='button' 
                            onClick={() => push({ teacher_id: '', department_id: de })}>Add</button>
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
