import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from "formik";
import tw from 'twin.macro';
import { Toaster } from 'react-hot-toast';
import toast from "react-hot-toast";

import { AddStuSchema } from '../../Validations/validation';
import { addStudent } from '../../helpers/adminHelper';
import { getDeTeacher } from '../../helpers/adminHelper';

const Alert = tw.div`text-red-700 text-sm`;
export default function Adminaddstu() {

    const navigate = useNavigate();
    const location = useLocation();
    const [de, setDe] = useState("");
    const [teacher, setTeacher] = useState("");

    useEffect(() => {
        if (location.state) {
            const { department_id } = location.state;
            setDe(department_id);
        }    
        // else navigate('/admin/seldepartment');

        
        
      }, []);
       
    useEffect(() => {
        const apiTeacher = async () => {
            try {
              const tech = await getDeTeacher(de);
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
    <div className='container text-lg'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <h3 className='text-center py-4'>Student Registration</h3>
        <div className='register-form'>
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
        </div>
    </div>
  )
}
