import React, { useState, useEffect } from 'react';
import tw from 'twin.macro';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Headeradmin from './Headeradmin';
import { getAllCourse } from '../../helpers/helper';
import { delCourse } from '../../helpers/adminHelper';

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

  function handleAdd(e, d) {
    navigate('/admin/adddetail', { state: { course_id: e, department_id: d } });
  }

  async function handleDel(e) {
   try {
    const res = await delCourse(e);
    toast.success(res.msg);
   } catch (error) {
    console.log(error);
   }
  }

  function handleEdit(e) {
    navigate('/admin/editcourse', { state: { course_id: e } });
  }
  return (
    <HelmetProvider>
    
      <div className='bg-indigo-200 h-auto'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <Helmet>
          <title>A | TableCourse</title>
        </Helmet>
        <Headeradmin />
        <div className='flex justify-center mt-2'>
          {
            data ? (
              <table className='my-2 table-fixed border-collapse border border-slate-500 text-center'>
                <thead>
                  <tr className='font-bold'>
                    <Row>Num</Row>
                    <Row>Course ID</Row>
                    <Row>Course Name</Row>
                    <Row>Status</Row>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((courseList, index) => (
                      <tr key={index}>
                        <Row>{index + 1}</Row>
                        <Row>{courseList.course_id}</Row>
                        <Row>{courseList.course_name}</Row>
                        {
                          (courseList.status) ? (
                            <Row className='text-greendark font-bold'>
                              <button className='text-green-600 hover:text-blue-700' type='button'
                                onClick={(e) => handleAdd(courseList.course_id, courseList.department_id)}>
                                Add</button>

                              <button className='text-orange-600 ml-10 hover:text-blue-700' type='button'
                                onClick={(e) => handleEdit(courseList.course_id)}>
                                Edit</button>

                              <button className='text-red-600 hover:text-blue-800 ml-10' type='button'
                                onClick={(e) => handleDel(courseList.course_id)}>
                                Del</button>
                            </Row>

                          ) : (
                            <Row className='bg-red-800'></Row>
                          )
                        }
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            ) : (
              <div className='my-5 h-screen'>
                <h3 className='ml-7 text-xl text-blue-900'>Course Lists</h3>
                <h2 className='my-4 ml-7 text-md text-blue-600 flex justify-center'>Not Have Course Lists Now</h2>
              </div>
            )
          }
        </div>
      </div>
    </HelmetProvider>
  )
}
