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
                                activity_name: '',
                                hours: '',
                                date_ac: '',
                                ac_day: '',
                                finite: '',
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
                                const activity_name = `activity[${index}].activity_name`;
                                const touchedName = getIn(touched, activity_name);
                                const errorName = getIn(errors, activity_name);

                                const activity_id = `activity[${index}].activity_id`;
                                const touchedId = getIn(touched, activity_id);
                                const errorId = getIn(errors, activity_id);

                                const finite = `activity[${index}].finite`;
                                const touchedfinite = getIn(touched, finite);
                                const errorfinite = getIn(errors, finite);

                                const date_ac = `activity[${index}].date_ac`;
                                const touchedDate = getIn(touched, date_ac);
                                const errorDate = getIn(errors, date_ac);

                                const ac_day = `activity[${index}].ac_day`;
                                const touchedDay = getIn(touched, ac_day);
                                const errorDay = getIn(errors, ac_day);

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
                                                    type='text' name={activity_name} value={p.activity_name} placeholder='Activity Name'></Field>
                                            {errorName && touchedName && (
                                                <Alert>{errorName}</Alert>
                                                )}
                                        </div>

                                        <div className='flex flex-col my-2 mx-1 '>
                                            <label htmlFor='finite'>finite Particular</label>
                                            <Field className='rounded-md border-2 border-sky' id='finite'
                                                    type='number' name={finite} value={p.finite} placeholder='finite'></Field>
                                            {errorfinite && touchedfinite && (
                                                <Alert>{errorfinite}</Alert>
                                            )}
                                        </div>

                                        <div className='flex flex-col  my-2 mx-1'>
                                            <label htmlFor='date_ac'>Activity Date</label>
                                            <Field className='rounded-md border-2 border-sky' id='date_ac'
                                                    type='date' name={date_ac} value={p.date_ac} placeholder='Activity Date'></Field>
                                            {errorDate && touchedDate && (
                                                <Alert>{errorDate}</Alert>
                                            )}
                                        </div>

                                        <div className='flex flex-col my-2 mx-1'>
                                            <label htmlFor='day'>Day in Activity</label>
                                            <Field className='rounded-md border-2 border-sky' id='day'
                                              type='number' name={ac_day} value={p.ac_day} placeholder='Day in Activity'></Field>
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
                                onClick={() => push({ activity_name: '', activity_id: '', finite: '', date_ac: '',
                                ac_day: '', hours: '' })}>Add</button>
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
