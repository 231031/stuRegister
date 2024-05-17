import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { getDepartment } from '../../helpers/helper';
import { getDeTeacher } from '../../helpers/adminHelper';
import Headeradmin from './Headeradmin';

const Row = tw.td`border border-slate-600 py-1 px-2 text-sm`;


export default function Admintableteach() {

  const [data, setData] = useState("");
  const [teacher, setTeacher] = useState("");
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
    const apiTeacher = async () => {
      try {
        const res = await getDeTeacher(sel);
        setTeacher(res);
      } catch (error) {
        console.error(error);
      }
    };
    if (sel) apiTeacher();
  }, [sel]);

  function handleUpdate(id) {
    navigate('/admin/updateteacher', { state: { teacher_id: id } });
  }

  function handleDel(id, first_name, last_name) {
    navigate('/admin/delteacher', { state: { teacher_id: id, first_name: first_name, last_name: last_name, department_id: sel } });
  }

  return (
    <HelmetProvider>
      <div>
       <Helmet>
          <title>A | TableTeacher</title>
        </Helmet>
        <Headeradmin />
        <div className='flex flex-col items-center'>
          {
            (data.length > 0) ? (
              <div className='flex flex-col w-1/4 mt-5'>
                <label htmlFor='sel' className='font-bold'>Select Department of Teacher</label>
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
              <p className='font-bold my-10 text-red-800 italic'>No Department for Choose Right Now</p>
            )
          }
          <div className='mt-10'>
            {
              (teacher.length) > 0 ? (
                <table className='my-2 table-fixed border-collapse border border-slate-500 text-center'>
                  <thead>
                    <tr className='font-bold'>
                      <Row>Num</Row>
                      <Row>Teacher ID</Row>
                      <Row>Teacher Name</Row>
                      <Row>Position</Row>
                      <Row>Status</Row>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      teacher.map((teaList, index) => (
                        <tr key={index}>
                          <Row>{index + 1}</Row>
                          <Row>{teaList.teacher_id}</Row>
                          <Row>{teaList.first_name} {teaList.last_name}</Row>
                          <Row>{teaList.position}</Row>
                          {
                            (teaList.status) ? (
                              <Row className='text-greendark font-bold'>
                                Active
                                <button className='text-orange-600 hover:text-blue-800 ml-10'
                                  onClick={(e) => handleUpdate(teaList.teacher_id)}>Update</button>
                                <button className='text-red-600 hover:text-blue-800 ml-10'
                                  onClick={(e) => handleDel(teaList.teacher_id, teaList.first_name, teaList.last_name)}>Del</button>
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
                  <h3 className='ml-7 text-xl text-blue-900 font-bold'>Teacher Lists</h3>
                  <h2 className='my-4 ml-7 text-md text-blue-600 flex justify-center font-bold'>Choose Department</h2>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </HelmetProvider>
  )
}
