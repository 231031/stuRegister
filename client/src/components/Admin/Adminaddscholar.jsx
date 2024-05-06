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
                                scholarshipName: '',
                                limit: '',
                                lowGrade: '',
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
                                const scholarshipName = `scholarship[${index}].scholarshipName`;
                                const touchedName = getIn(touched, scholarshipName);
                                const errorName = getIn(errors, scholarshipName);

                                const scholarship_id = `scholarship[${index}].scholarship_id`;
                                const touchedId = getIn(touched, scholarship_id);
                                const errorId = getIn(errors, scholarship_id);

                                const limit = `scholarship[${index}].limit`;
                                const touchedLimit = getIn(touched, limit);
                                const errorLimit = getIn(errors, limit);

                                const lowGrade = `scholarship[${index}].lowGrade`;
                                const touchedLow = getIn(touched, lowGrade);
                                const errorLow = getIn(errors, lowGrade);

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
                                                    type='text' name={scholarshipName} value={p.scholarshipName} placeholder='Scholarship Name'></Field>
                                            {errorName && touchedName && (
                                                <Alert>{errorName}</Alert>
                                                )}
                                        </div>

                                        <div className='flex flex-col'>
                                            <Field className='rounded-md my-2 mx-1 border-2 border-sky' 
                                                    type='text' name={limit} value={p.limit} placeholder='limit'></Field>
                                            {errorLimit && touchedLimit && (
                                                <Alert>{errorLimit}</Alert>
                                            )}
                                        </div>

                                        <div className='flex flex-col'>
                                            <Field className='rounded-md my-2 mx-1 border-2 border-sky' 
                                                    type='text' name={lowGrade} value={p.lowGrade} placeholder='Low Grade'></Field>
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
                                onClick={() => push({ scholarshipName: '', scholarship_id: '', limit: '', lowGrade: '',
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
