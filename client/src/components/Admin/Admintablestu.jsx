import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { getDepartment } from '../../helpers/helper';
import { getDeStudent, delStudent } from '../../helpers/adminHelper';
import Headeradmin from './Headeradmin';
import toast, { Toaster } from 'react-hot-toast';

const Row = tw.td`border border-slate-600 py-1 px-2 text-sm`;


export default function Admintablestu() {

  const [data, setData] = useState("");
  const [stu, setStu] = useState("");
  const [sel, setSel] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const apiCall = async () => {
      try {
        const res = await getDepartment();
        setData(res);
      } catch (error) {
        console.error(error);
      }
    };
    apiCall();
  }, []);

  useEffect(() => {
    const apiStu = async () => {
      try {
        const res = await getDeStudent(sel);
        setStu(res);
      } catch (error) {
        console.error(error);
      }
    };
    if (sel) apiStu();
  }, [sel]);

  function handleUpdate(id) {
    navigate('/admin/updatestudent', { state: { student_id: id } });
  }

  async function handleDel(id) {
    try {
      const res = await delStudent(id);
      toast.success(res.msg);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <HelmetProvider>
      <div>
      <Toaster position='top-center' reverseOrder={false}></Toaster>

        <Helmet>
          <title>A | TableStudent</title>
        </Helmet>
        <Headeradmin />
        <div className='flex flex-col items-center'>
          {
            (data.length > 0) ? (
              <div className='flex flex-col w-1/4 mt-5'>
                <label htmlFor='sel' className='font-bold'>Select Department of Student</label>
                <select
                  className='border-2 border-sky   rounded-md' id='sel'
                  onChange={(e) => setSel(e.target.value)}>
                  <option value=''></option>
                  {
                    data.map((deList, index) => (
                      <option key={index} value={deList.department_id}>{deList.department_id} {deList.departmentName}</option>
                    ))
                  }
                </select>
              </div>

            ) : (
              <p className='my-5'>No Department for Choose Right Now</p>
            )
          }
          <div className='mt-10'>
            {
              (stu.length) > 0 ? (
                <table className='my-2 table-fixed border-collapse border border-slate-500 text-center'>
                  <thead>
                    <tr className='font-bold'>
                      <Row>Num</Row>
                      <Row>Student ID</Row>
                      <Row>Student Name</Row>
                      <Row>Year</Row>
                      <Row>Status</Row>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      stu.map((stuList, index) => (
                        <tr key={index}>
                          <Row>{index + 1}</Row>
                          <Row>{stuList.student_id}</Row>
                          <Row>{stuList.first_name} {stuList.last_name}</Row>
                          <Row>{new Date().getFullYear() + 543 - stuList?.year}</Row>
                          {
                            (stuList.status) ? (
                              <Row className='text-greendark font-bold'>
                                Active
                                <button className='text-orange-600 ml-10 hover:text-blue-700' onClick={(e) => handleUpdate(stuList.student_id)}>Update</button>
                                <button className='text-red-600 ml-10 hover:text-blue-700' onClick={(e) => handleDel(stuList.student_id)}>Del</button>
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
                <div className='my-5 h-72'>
                  <h3 className='ml-7 text-xl text-blue-900'>Student Lists</h3>
                  <h2 className='my-4 ml-7 text-md text-blue-600 flex justify-center'>Choose Department</h2>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </HelmetProvider>
  )
}
