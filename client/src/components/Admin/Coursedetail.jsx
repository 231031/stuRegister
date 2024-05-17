import React, { useState, useEffect } from 'react'
import { Formik, Field, Form, FieldArray, getIn } from "formik";
import tw from 'twin.macro';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { DetailSchema } from '../../Validations/validation';
import { addDetail, getDeTeacherAc } from '../../helpers/adminHelper';
import { useNavigate } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Headeradmin from './Headeradmin';

const Fill = tw.div`flex flex-col items-center`;
const Alert = tw.div`text-red-700 text-sm mt-1`;
export default function Coursedetail() {


    const navigate = useNavigate();
    const location = useLocation();
    const [course_id, setCourse] = useState('');
    const [de, setDe] = useState('');
    const [teacher, setTeacher] = useState('');

    useEffect(() => {
        if (location.state) {
            setCourse(location.state.course_id);
            setDe(location.state.department_id);
        }    
        else navigate('/admin/editcourse');
      }, []);
    
    useEffect(() => {
        const apiTeacher = async () => {
            try {
              const res = await getDeTeacherAc(de);
              setTeacher(res);
            } catch (error) {
                toast.error('Cannot Get Information');
                console.error(error);
            } 
          };
          if (de) apiTeacher();
    }, [de])
    

  return (
    <HelmetProvider>
        <div>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <Helmet>
                <title>A | AddCourseD</title>
            </Helmet>
            <Headeradmin/>
            <h3 className='text-lg text-center py-4'>Course Registration</h3>
            <div className='register-form'>
                <Formik 
                    initialValues={{
                        course_de : [
                            {
                                course_id: '',
                                teacher_id: '',
                                gr: '',
                                finite: '',
                                start_time: '',
                                finish_time: '',
                                day: '',
                                class_id: '',
                            }
                        ]    
                    }}
                    validationSchema={DetailSchema}
                    onSubmit={async (values) => {
                        try {
                            values.course_de[0].course_id = course_id;
                            const res = await addDetail(values);
                            toast.success(res.msg);

                        } catch (error) {
                            toast.error('Course has already been registered');
                            console.log(error);
                        }
                    }}  
                >  
                    {({ values, errors, touched }) => (
                        <Form className='flex flex-col items-center text-sm'>
                            <FieldArray name='course_de'>
                            {({ push, remove }) => (
                                <div>
                                {values.course_de.map((p, index) => {

                                    const teacher_id = `course_de[${index}].teacher_id`;
                                    const touchedTeacher = getIn(touched, teacher_id);
                                    const errorTeacher = getIn(errors, teacher_id);

                                    const gr = `course_de[${index}].gr`;
                                    const touchedgr = getIn(touched, gr);
                                    const errorgr = getIn(errors, gr);

                                    const finite = `course_de[${index}].finite`;
                                    const touchedfinite = getIn(touched, finite);
                                    const errorfinite = getIn(errors, finite);

                                    const start_time = `course_de[${index}].start_time`;
                                    const touchedStart = getIn(touched, start_time);
                                    const errorStart = getIn(errors, start_time);

                                    const finish_time = `course_de[${index}].finish_time`;
                                    const touchedFinish = getIn(touched, finish_time);
                                    const errorFinish = getIn(errors, finish_time);

                                    const class_id = `course_de[${index}].class_id`;
                                    const touchedClass = getIn(touched, class_id);
                                    const errorClass = getIn(errors, class_id);

                                    const day = `course_de[${index}].day`;
                                    const touchedDay = getIn(touched, day);
                                    const errorDay = getIn(errors, day);

                                    return (
                                    <div key={index} className='flex flex-wrap my-2'>
                                        <Fill>
                                            <Field className='rounded-md mx-1 border-2 border-sky' type='number' 
                                            name={gr} value={p.gr} placeholder='gr Number'></Field>
                                            {errorgr && touchedgr && (
                                                <Alert>{errorgr}</Alert>
                                            )}
                                        </Fill>
                                        <Fill>
                                            <Field className='rounded-md mx-1 border-2 border-sky' type='number' 
                                            name={finite} value={p.finite} placeholder='finite Student'></Field>
                                            {errorfinite && touchedfinite && (
                                                <Alert>{errorfinite}</Alert>
                                            )}
                                        </Fill>
                                        <Fill>
                                            <Field className='rounded-md mx-1 border-2 border-sky' as="select" name={day} value={p.day}>
                                                <option></option>
                                                <option value="monday">monday</option>
                                                <option value="tuesday">tuesday</option>
                                                <option value="wednesday">wednesday</option>
                                                <option value="thursday">thursday</option>
                                                <option value="friday">friday</option>
                                                <option value="saturday">saturday</option>
                                                <option value="sunday">sunday</option>
                                            </Field>
                                            {errorDay && touchedDay && (
                                                <Alert>{errorDay}</Alert>
                                            )}
                                        </Fill>
                                        
                                        <Fill>
                                            <Field className='rounded-md mx-1 border-2 border-sky' 
                                            name={class_id} value={p.class_id} placeholder='Class ID'></Field>
                                            {errorClass && touchedClass && (
                                                <Alert>{errorClass}</Alert>
                                            )}
                                        </Fill>
                                        <Fill>
                                            {
                                                (teacher.length > 0)  ? (
                                                    <Field className='rounded-md mx-1 border-2 border-sky' type='text' 
                                                    name={teacher_id} value={p.teacher_id} as='select'>
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
                                            {errorTeacher && touchedTeacher && (
                                                <Alert>{errorTeacher}</Alert>
                                            )}
                                        </Fill>
                                        <Fill>
                                            <Field className='rounded-md mx-1 border-2 border-sky' type='text' 
                                            name={start_time} value={p.start_time} placeholder='Start Time (00:00 - 23:59)'></Field>
                                            {errorStart && touchedStart && (
                                                <Alert>{errorStart}</Alert>
                                            )}
                                        </Fill>
                                        <Fill>
                                            <Field className='rounded-md mx-1 border-2 border-sky' type='text' 
                                            name={finish_time} value={p.finish_time} placeholder='Finish Time'></Field>
                                            {errorFinish && touchedFinish && (
                                                <Alert>{errorFinish}</Alert>
                                            )}
                                        </Fill>

                                        <button type='button' className='px-1 rounded-md border-2 border-sky bg-red-500' onClick={() => remove(index)} 
                                            disabled={values.course_de.length === 1}> X </button>
                                        
                                    </div>
                                    );
                                })}
                                <button className='border-2 bg-yellow-500 px-4 rounded-md' type='button' 
                                onClick={() => push({ course_id: course_id, gr: '', finite: '', start_time: '', finish_time: '', 
                                    teacher_id: '', class_id: '', day: '' })}>Add</button>
                                </div>
                            )}
                            </FieldArray>
                            <button type="submit" className="btn border-2 bg-sky text-white rounded-md my-2 px-4">SUBMIT</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    </HelmetProvider>
  )
}

{/* <div className='container text-lg'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <h3 className='text-center py-4'>Course Registration</h3>
        <div className='register-form'>
            <Formik 
                initialValues={{
                    course_id: '',
                    teacher_id: '',
                    gr : '',
                    finite: '',
                    start_time: '',
                    finish_time: '',
                    day: '',
                    class_id: '',
                }}
                validationSchema={DetailSchema}
                onSubmit={async (values) => {
                    try {
                        values.course_id = course_id;
                        const res = await addDetail(values);
                        toast.success('Add Detail was successfully');

                    } catch (error) {
                        toast.error('Duplicate Add');
                        console.log(error);
                    }
                }}  
            >  
                {({ errors, touched }) => (
                    <Form className='flex flex-col items-center '>
                        <Field className='rounded-md mx-1 border-2 border-sky-700' type='text' name='teacher_id' placeholder='Teacher ID'></Field>
                        {errors.teacher_id && touched.teacher_id ? (
                            <Alert>{errors.teacher_id}</Alert>
                        ) : null}
                        <Field className='border-2 border-blue-500 rounded-md my-2 w-2/4' type='text' name='class_id' placeholder='Class ID'></Field>
                        {errors.class_id && touched.class_id ? (
                            <Alert>{errors.class_id}</Alert>
                        ) : null}
                        <Field className='border-2 border-blue-500 rounded-md my-2 w-2/4' as="select" name="major">
                            <option></option>
                            <option value="thai">Thai</option>
                            <option value="eng">Eng</option>
                        </Field>
                        {errors.major && touched.major ? (
                            <Alert>{errors.major}</Alert>
                        ) : null}
                        <Field className='border-2 border-blue-500 rounded-md my-2 w-2/4' type='number' name='gr' placeholder='gr Number'></Field>
                        {errors.gr && touched.gr ? (
                            <Alert>{errors.gr}</Alert>
                        ) : null}
                        <Field className='border-2 border-blue-500 rounded-md my-2 w-2/4' type='number' name='finite' placeholder='finite Student'></Field>
                        {errors.finite && touched.finite ? (
                            <Alert>{errors.finite}</Alert>
                        ) : null}
                        <Field className='border-2 border-blue-500 rounded-md my-2 w-2/4' as="select" name="day">
                            <option></option>
                            <option value="monday">monday</option>
                            <option value="tuesday">tuesday</option>
                            <option value="wednesday">wednesday</option>
                            <option value="thursday">thursday</option>
                            <option value="friday">friday</option>
                            <option value="saturday">saturday</option>
                            <option value="sunday">sunday</option>
                        </Field>
                        {errors.password && touched.password ? (
                            <Alert>{errors.password}</Alert>
                        ) : null}
                        <Field className='border-2 border-blue-500 rounded-md my-2 w-2/4' type='text' name='start_time' placeholder='Start Time (00:00 - 23:59)'></Field>
                        {errors.password && touched.password ? (
                            <Alert>{errors.password}</Alert>
                        ) : null}
                        <Field className='border-2 border-blue-500 rounded-md my-2 w-2/4' type='text' name='finish_time' placeholder='Finish Time'></Field>
                        {errors.password && touched.password ? (
                            <Alert>{errors.password}</Alert>
                        ) : null}
                        <button type="submit" className="btn border-2 bg-green-500 rounded-md my-2 w-2/4">SUBMIT</button>
                    </Form>
                )}
            </Formik>
        </div>
    </div> */}
