import React, { useState, useEffect } from 'react';
import tw from 'twin.macro';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

import Header from './Header';
import { getAllCourse } from '../helpers/helper';

const Row = tw.td`border border-slate-600 py-1 px-2 text-sm`;
export default function Coursetable() {
  const [data, setData] = useState("");
  const navigate = useNavigate();

    useEffect(() => {
      const apiCall = async () => {
        try {
          const res = await getAllCourse();
          setData(res);
        } catch (error) {
            toast.error('Cannot Get Information');
            console.error(error);
        } 
      };
      apiCall();
    }, []);

    function handleAdd(e) {
      navigate('/admin/adddetail', { state : { course_id : e }});
    }

    function handleDel(e) {
      navigate('/admin/adddetail', { state : { course_id : e }});
    }
  return (
    <div className='bg-indigo-200 h-screen'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <Header/>
        <div className='flex justify-center mt-2'>
        {
            data? (
                <table className='my-2 table-fixed border-collapse border border-slate-500'>
                    <thead>
                      <tr>
                        <Row>Num</Row>
                        <Row>Course ID</Row>
                        <Row>Course Name</Row>
                        <Row>Add</Row>
                        <Row>Del</Row>
                      </tr>
                    </thead>
                    <tbody>
                    {
                        data.map((courseList, index) => (
                            <tr key={index}>
                              <Row>{index+1}</Row>
                              <Row>{courseList.course_id}</Row>
                              <Row>{courseList.courseName}</Row>
                              <Row><button className='text-green-600' onClick={(e) => handleAdd(courseList.course_id)}>Add</button></Row>
                              <Row><button className='text-red-600' onClick={(e) => handleDel(courseList.course_id)}>Del</button></Row>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>   
            ) : (
                <div className='my-5 h-72'>
                    <h3 className='ml-7 text-xl text-blue-900'>Course Lists</h3>
                    <h2 className='my-4 ml-7 text-md text-blue-600 flex justify-center'>Not Have Course Lists Now</h2>
                </div>
            )
        }
        </div>
      </div>
  )
}
