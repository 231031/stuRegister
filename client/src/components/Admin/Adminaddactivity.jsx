import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, FieldArray, getIn } from "formik";
import tw from 'twin.macro';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Headeradmin from './Headeradmin';
import { ActivitySchema } from '../../Validations/validation';
import { addActivity } from '../../helpers/adminHelper';

const Alert = tw.div`text-red-700 text-sm`;
export default function Adminaddactivity() {
  return (
    <HelmetProvider>
      <div>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <Helmet>
          <title>A | AddActivity</title>
        </Helmet>
        <Headeradmin/>
        <h3 className='text-lg text-center py-2'>Add Activity</h3>
            <div className='register-form'>
                <Formik 
                    initialValues={{
                        activity : [
                            {
                                activity_id: '',
                                activityName: '',
                                hours: '',
                                dateAc: '',
                                acDay: '',
                                limit: '',
                            }
                        ]    
                    }}
                    validationSchema={ActivitySchema}
                    onSubmit={async (values) => {
                        try {
                            const res = await addActivity(values);
                            toast.success(res.msg);
                        } catch (error) {
                            toast.error('Activity has already been registered');
                            console.log(error);
                        }
                    }}  
                >  
                     {({ values, touched, errors }) => (
                        <Form className='flex flex-col items-center w-full text-sm'>
                        
                        <FieldArray name="activity">
                            {({ push, remove }) => (
                            <div>
                                {values.activity.map((p, index) => {
                                const activityName = `activity[${index}].activityName`;
                                const touchedName = getIn(touched, activityName);
                                const errorName = getIn(errors, activityName);

                                const activity_id = `activity[${index}].activity_id`;
                                const touchedId = getIn(touched, activity_id);
                                const errorId = getIn(errors, activity_id);

                                const limit = `activity[${index}].limit`;
                                const touchedLimit = getIn(touched, limit);
                                const errorLimit = getIn(errors, limit);

                                const dateAc = `activity[${index}].dateAc`;
                                const touchedDate = getIn(touched, dateAc);
                                const errorDate = getIn(errors, dateAc);

                                const acDay = `activity[${index}].acDay`;
                                const touchedDay = getIn(touched, acDay);
                                const errorDay = getIn(errors, acDay);

                                const hours = `activity[${index}].hours`;
                                const touchedHours = getIn(touched, hours);
                                const errorHours = getIn(errors, hours);

                                return (
                                    <div key={index} className='flex flex-wrap flex-row my-4'>
                                      <div className='flex flex-col my-2 mx-1'>
                                        <label htmlFor='id'>Activity ID</label>
                                        <Field className='rounded-md  border-2 border-sky' id='id'
                                                type='text' name={activity_id} value={p.activity_id} placeholder='Activity ID'></Field>
                                        {errorId && touchedId && (
                                            <Alert>{errorId}</Alert>
                                            )}
                                    </div>

                                        <div className='flex flex-col my-2 mx-1'>
                                            <label htmlFor='name'>Activity Name</label>
                                            <Field className='rounded-md  border-2 border-sky' id='name'
                                                    type='text' name={activityName} value={p.activityName} placeholder='Activity Name'></Field>
                                            {errorName && touchedName && (
                                                <Alert>{errorName}</Alert>
                                                )}
                                        </div>

                                        <div className='flex flex-col my-2 mx-1 '>
                                            <label htmlFor='limit'>Limit Particular</label>
                                            <Field className='rounded-md border-2 border-sky' id='limit'
                                                    type='number' name={limit} value={p.limit} placeholder='limit'></Field>
                                            {errorLimit && touchedLimit && (
                                                <Alert>{errorLimit}</Alert>
                                            )}
                                        </div>

                                        <div className='flex flex-col  my-2 mx-1'>
                                            <label htmlFor='dateAc'>Activity Date</label>
                                            <Field className='rounded-md border-2 border-sky' id='dateAc'
                                                    type='date' name={dateAc} value={p.dateAc} placeholder='Activity Date'></Field>
                                            {errorDate && touchedDate && (
                                                <Alert>{errorDate}</Alert>
                                            )}
                                        </div>

                                        <div className='flex flex-col my-2 mx-1'>
                                            <label htmlFor='day'>Day in Activity</label>
                                            <Field className='rounded-md border-2 border-sky' id='day'
                                              type='number' name={acDay} value={p.acDay} placeholder='Day in Activity'></Field>
                                            {errorDay && touchedDay && (
                                                <Alert>{errorDay}</Alert>
                                            )}
                                        </div>

                                        <div className='flex flex-col my-2 mx-1 '>
                                            <label htmlFor='hours'>Activity Hours</label>
                                            <Field className='rounded-md border-2 border-sky' id='hours'
                                              type='number' name={hours} value={p.hours} placeholder='Activity Hours'></Field>
                                            {errorHours && touchedHours && (
                                                <Alert>{errorHours}</Alert>
                                            )}
                                        </div>
                                        
                                        <button type='button' className='px-1 rounded-md border-2 border-red-700' onClick={() => remove(index)} 
                                            disabled={values.activity.length === 1}> X </button>
                                    
                                    </div>
                                );
                                })}
                                
                                <button className='border-2 bg-blue-500 px-4 rounded-md' type='button' 
                                onClick={() => push({ activityName: '', activity_id: '', limit: '', dateAc: '',
                                acDay: '', hours: '' })}>Add</button>
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
