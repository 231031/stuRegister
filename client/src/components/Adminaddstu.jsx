import React, { useEffect, useState } from 'react'
import { Formik, Field, Form } from "formik";
import tw from 'twin.macro';
import { Toaster } from 'react-hot-toast';
import toast from "react-hot-toast";
import { addStudent } from '../helpers/adminHelper';
import { getFacDe } from '../helpers/helper';

const Alert = tw.div`text-red-700 text-sm`;
export default function Adminaddstu() {

    const [fac, setFac] = useState("");
    const [de, setDe] = useState("");
    const [sel, setSel] = useState("");

    useEffect(() => {
        const apiFac = async () => {
            try {
              const res = await getFacDe();
              setFac(res.fac);
              setDe(res.de);

            } catch (error) {
                toast.error('Cannot Get Information');
                console.error(error);
            } 
        };
        apiFac();
    }, [])

    function filterDe(e) {
        const filteredData = de.filter(deList => deList.faculty_id === e);
        setSel(filteredData);
    }

  return (
    <div className='container text-lg'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <h3 className='text-center py-4'>Student Registration</h3>
        <div className='register-form'>
            <Formik 
                initialValues={{
                    year: '',
                    department: '',
                    number: '',
                }}
                onSubmit={async (values) => {
                    try {
                        await addStudent(values);
                        toast.success('Student registration successfully');

                    } catch (error) {
                        toast.error('Student registration was failed');
                        console.error(error);
                    }
                }}  
            >  
                <Form className='flex flex-col items-center '>
                    <Field className='border-2 border-sky-500 rounded-md my-3 w-1/3' type='text' name='year' placeholder='year - XX' required></Field>
                    {
                       
                        (fac.length > 0)? (
                            <Field className='border-2 border-blue-500 rounded-md my-2 w-2/4' as="select" name="faculty"
                                onChange={(e) => { filterDe(e.target.value);}}
                            >
                            {
                                fac.map((facList, index) => (
                                    <option key={index}>{facList.faculty_id}</option>
                                ))
                            }
                            </Field>
                        ) : (
                            <h4>No faculty Available</h4>
                        )
                    }
                    {
                        (sel.length > 0)  ? (
                            <Field className='border-2 border-sky-500 rounded-md my-3 w-1/3' type='text' name='department' placeholder='department' required>
                            {
                                sel.map((selList, index) => (
                                    <option key={index} value={selList.department_id}>{selList.department_id}</option>
                                ))
                            }
                            </Field>

                        ) : (
                                <h4>No department Available</h4>
                            )
                    }
                    <Field className='border-2 border-sky-500 rounded-md my-3 w-1/3' type='number' name='number' placeholder='number' required></Field>
                    <button type="submit" className="btn border-2 bg-green-500 rounded-md my-3 w-1/3">SUBMIT</button>
                </Form>
            </Formik>
        </div>
    </div>
  )
}
