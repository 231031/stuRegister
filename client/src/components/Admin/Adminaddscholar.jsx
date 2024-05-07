import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, FieldArray, getIn } from "formik";
import tw from 'twin.macro';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Headeradmin from './Headeradmin';
import { ScholarshipSchema } from '../../Validations/validation';
import { addScholarship } from '../../helpers/adminHelper';

const Alert = tw.div`text-red-700 text-sm`;
export default function Adminaddscholar() {
  return (
    <HelmetProvider>
      <div>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <Helmet>
          <title>A | AddScholar</title>
        </Helmet>
        <Headeradmin/>
        <h3 className='text-lg text-center py-2'>Add Scholarship</h3>
            <div className='register-form'>
                <Formik 
                    initialValues={{
                        scholarship : [
                            {
                                scholarship_id: '',
                                scholarship_name: '',
                                finite: '',
                                low_grade: '',
                                start: '',
                                end: '',
                            }
                        ]    
                    }}
                    validationSchema={ScholarshipSchema}
                    onSubmit={async (values) => {
                        try {

                              const res = await addScholarship(values);
                              toast.success(res.msg);
                            
                        } catch (error) {
                            toast.error('Scholarship has already been registered');
                            console.log(error);
                        }
                    }}  
                >  
                     {({ values, touched, errors }) => (
                        <Form className='flex flex-col items-center w-full text-sm'>
                        
                        <FieldArray name="scholarship">
                            {({ push, remove }) => (
                            <div>
                                {values.scholarship.map((p, index) => {
                                const scholarship_name = `scholarship[${index}].scholarship_name`;
                                const touchedName = getIn(touched, scholarship_name);
                                const errorName = getIn(errors, scholarship_name);

                                const scholarship_id = `scholarship[${index}].scholarship_id`;
                                const touchedId = getIn(touched, scholarship_id);
                                const errorId = getIn(errors, scholarship_id);

                                const finite = `scholarship[${index}].finite`;
                                const touchedfinite = getIn(touched, finite);
                                const errorfinite = getIn(errors, finite);

                                const low_grade = `scholarship[${index}].low_grade`;
                                const touchedLow = getIn(touched, low_grade);
                                const errorLow = getIn(errors, low_grade);

                                const start = `scholarship[${index}].start`;
                                const touchedStart = getIn(touched, start);
                                const errorStart = getIn(errors, start);

                                const end = `scholarship[${index}].end`;
                                const touchedEnd = getIn(touched, end);
                                const errorEnd = getIn(errors, end);

                                return (
                                    <div key={index} className='flex flex-wrap flex-row my-4'>
                                      <div className='flex flex-col'>
                                            <Field className='rounded-md my-2 mx-1 border-2 border-sky' 
                                                    type='text' name={scholarship_id} value={p.scholarship_id} placeholder='Scholarship ID'></Field>
                                            {errorId && touchedId && (
                                                <Alert>{errorId}</Alert>
                                                )}
                                        </div>

                                        <div className='flex flex-col'>
                                            <Field className='rounded-md my-2 mx-1 border-2 border-sky' 
                                                    type='text' name={scholarship_name} value={p.scholarship_name} placeholder='Scholarship Name'></Field>
                                            {errorName && touchedName && (
                                                <Alert>{errorName}</Alert>
                                                )}
                                        </div>

                                        <div className='flex flex-col'>
                                            <Field className='rounded-md my-2 mx-1 border-2 border-sky' 
                                                    type='text' name={finite} value={p.finite} placeholder='finite'></Field>
                                            {errorfinite && touchedfinite && (
                                                <Alert>{errorfinite}</Alert>
                                            )}
                                        </div>

                                        <div className='flex flex-col'>
                                            <Field className='rounded-md my-2 mx-1 border-2 border-sky' 
                                                    type='text' name={low_grade} value={p.low_grade} placeholder='Low Grade'></Field>
                                            {errorLow && touchedLow && (
                                                <Alert>{errorLow}</Alert>
                                            )}
                                        </div>

                                        <div className='flex flex-col'>
                                            <Field className='rounded-md my-2 mx-1 border-2 border-sky' min="2024-05-01"
                                              type='date' name={start} value={p.start} placeholder='Open Time'></Field>
                                            {errorStart && touchedStart && (
                                                <Alert>{errorStart}</Alert>
                                            )}
                                        </div>

                                        <div className='flex flex-col'>
                                            <Field className='rounded-md my-2 mx-1 border-2 border-sky' min="2024-05-01"
                                              type='date' name={end} value={p.end} placeholder='End Time'></Field>
                                            {errorEnd && touchedEnd && (
                                                <Alert>{errorEnd}</Alert>
                                            )}
                                        </div>
                                        
                                        <button type='button' className='px-1 rounded-md border-2 border-red-700' onClick={() => remove(index)} 
                                            disabled={values.scholarship.length === 1}> X </button>
                                    
                                    </div>
                                );
                                })}
                                
                                <button className='border-2 bg-blue-500 px-4 rounded-md' type='button' 
                                onClick={() => push({ scholarship_name: '', scholarship_id: '', finite: '', low_grade: '',
                                                      start: '', end: '' })}>Add</button>
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
