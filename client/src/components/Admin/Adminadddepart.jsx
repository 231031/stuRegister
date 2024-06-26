import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, FieldArray, getIn } from "formik";
import tw from 'twin.macro';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { DepartmentSchema } from '../../Validations/validation';
import { addDepartment } from '../../helpers/adminHelper';
import Headeradmin from './Headeradmin';

const Alert = tw.div`text-red-700 text-sm`;
export default function Adminadddepart() {
    const navigate = useNavigate();
    const location = useLocation();
    const [faculty_id, setFac] = useState('');

    useEffect(() => {
        if (location.state) {
            const { faculty_id } = location.state;
            setFac(faculty_id);
        }    
        else navigate('/admin/selfac');
        
      }, []);

      
  return (
    <HelmetProvider>
        <div className='text-lg'>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <Helmet>
                <title>A | AddDepartment</title>
            </Helmet>
            <Headeradmin/>
            <h3 className='text-center py-2'>Department Registration</h3>
            <h4 className='text-center'>Faculty of {faculty_id}</h4>
            <div className='register-form'>
                <Formik 
                    initialValues={{
                        department : [
                            {
                                faculty_id: '',
                                department_id: '',
                                department_name: '',
                            }
                        ]    
                    }}
                    validationSchema={DepartmentSchema}
                    onSubmit={async (values) => {
                        try {
                            values.department[0].faculty_id = faculty_id;
                            const res = await addDepartment(values);
                            toast.success(res.msg);

                        } catch (error) {
                            toast.error('Department has already been registered');
                            console.log(error);
                        }
                    }}  
                >  
                    {({ values, errors, touched }) => (
                        <Form className='flex flex-col items-center text-sm'>
                            <FieldArray name='department'>
                            {({ push, remove }) => (
                                <div>
                                {values.department.map((p, index) => {
                                    const department_name = `department[${index}].department_name`;
                                    const touchedName = getIn(touched, department_name);
                                    const errorName = getIn(errors, department_name);

                                    const department_id = `department[${index}].department_id`;
                                    const touchedId = getIn(touched, department_id);
                                    const errorId = getIn(errors, department_id);

                                    return (
                                    <div key={index} className='flex flex-row my-4'>
                                        <div className='flex flex-col'>
                                            <Field className='rounded-md mx-1 border-2 border-sky' 
                                            name={department_id} value={p.department_id} placeholder='Department ID'></Field>
                                            {errorId && touchedId && (
                                                <Alert>{errorId}</Alert>
                                                )}
                                        </div>
                                        <div className='flex flex-col'>
                                            <Field className='rounded-md mx-1 border-2 border-sky' 
                                            name={department_name} value={p.department_name} placeholder='Department Name'></Field>
                                            {errorName && touchedName && (
                                                <Alert>{errorName}</Alert>
                                            )}
                                        </div>
                                        <button type='button' className='px-1 rounded-md border-2 border-red-400' onClick={() => remove(index)} 
                                            disabled={values.department.length === 1}> X </button>
                                        
                                    </div>
                                    );
                                })}
                                <button className='border-2 border-sky px-4 rounded-md' type='button' 
                                onClick={() => push({ department_id: '', department_name: '', faculty_id: faculty_id })}>Add</button>
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
