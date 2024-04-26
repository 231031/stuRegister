import React from 'react';
import tw from 'twin.macro';
import { Field, FieldArray, Form, Formik, getIn } from "formik";
import toast, { Toaster } from 'react-hot-toast';

import { FacSchema } from '../Validations/validation';
import { addFaculty } from '../helpers/adminHelper';

const Alert = tw.p`text-red-700 text-sm`;
export default function Adminaddfac() {
  return (
    <div className='container'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
      <Formik
        initialValues={{
          faculty: [
            {
              faculty_id: '',
              facultyName: '',
            }
          ]
        }}
        validationSchema={FacSchema}
        onSubmit={async (values) => {
            try {
                const res = await addFaculty(values);
                toast.success(res.msg);
            } catch (error) {
                toast.error('Duplicate Add');
                console.log(error);
            }
        }}
      >
        {({ values, touched, errors }) => (
          <Form className='flex flex-col items-center w-full'>
            <FieldArray name="faculty">
              {({ push, remove }) => (
                <div>
                  {values.faculty.map((p, index) => {
                    const facultyName = `faculty[${index}].facultyName`;
                    const touchedName = getIn(touched, facultyName);
                    const errorName = getIn(errors, facultyName);

                    const faculty_id = `faculty[${index}].faculty_id`;
                    const touchedId = getIn(touched, faculty_id);
                    const errorId = getIn(errors, faculty_id);

                    return (
                      <div key={index} className='flex flex-row my-4'>
                        <div className='flex flex-col'>
                            <Field className='rounded-md my-2 mx-1 border-2 border-sky-700' 
                                    type='text' name={faculty_id} value={p.faculty_id}></Field>
                            {errorId && touchedId && (
                                <Alert>{errorId}</Alert>
                                )}
                        </div>
                        <div className='flex flex-col'>
                            <Field className='rounded-md my-2 mx-1 border-2 border-sky-700' 
                                    type='text' name={facultyName} value={p.facultyName}></Field>
                            {errorName && touchedName && (
                                <Alert>{errorName}</Alert>
                                )}
                        </div>
                        <button type='button' className='px-1 rounded-md border-2 border-red-700' onClick={() => remove(index)} 
                            disabled={values.faculty.length === 1}> X </button>
                        
                      </div>
                    );
                  })}
                  <button className='border-2 border-blue-500 px-4 rounded-md' type='button' onClick={() => push({ faculty_id: '', facultyName: '' })}>Add</button>
                </div>
              )}
            </FieldArray>
            <button className='border-2 border-green-500 px-4 rounded-md' type="submit">submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
