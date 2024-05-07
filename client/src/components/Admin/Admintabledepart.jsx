// add students and teachers ans courses from this department
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import toast, { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { getDeInFac } from '../../helpers/adminHelper';
import Headeradmin from './Headeradmin';

const Row = tw.td`border border-slate-600 py-1 px-2 text-sm`;

export default function Admintabledepart() {

    const navigate = useNavigate();
    const location = useLocation();
    const [de, setDe] = useState('');
    const [fac, setFac] = useState('');

    useEffect(() => {
        if (location.state) {
            setFac(location.state.faculty_id);
        }

        else navigate('/admin/selfac');  
    }, [])

    useEffect(() => {
        const apiDe = async () => {
            try {
              const department = await getDeInFac(fac);
              setDe(department);

            } catch (error) {
                toast.error('Cannot Get Information');
                console.error(error);
            } 
        };
        if (fac) apiDe();
    }, [fac]);

    function addStudent(e) {
        navigate('/admin/addstu', { state : { department_id : e }});
    }

    function addTeacher(e) {
        navigate('/admin/addteacher', { state : { department_id : e }});
    }

    function addCourse(e) {
        navigate('/admin/addcourse', { state : { department_id : e }});
    }

    function addAvailable(e) {
        navigate('/admin/addavailable', { state : { department_id : e }});
    }

  return (
    <HelmetProvider>
      <div className='bg-indigo-200 h-screen'>
          <Toaster position='top-center' reverseOrder={false}></Toaster>
          <Helmet>
              <title>A | TableDepartment</title>
          </Helmet>
          <Headeradmin/>
          <div className='flex justify-center mt-2'>
          {
              de.length > 0? (
                  <table className='my-2 table-fixed border-collapse border border-slate-500'>
                      <thead>
                        <tr>
                          <Row>Num</Row>
                          <Row>Department ID</Row>
                          <Row>Teacher</Row>
                          <Row>Student</Row>
                          <Row>Course</Row>
                          <Row>Available Course</Row>
                        </tr>
                      </thead>
                      <tbody>
                      {
                          de.map((deList, index) => (
                              <tr key={index}>
                                <Row>{index+1}</Row>
                                <Row>{deList.department_id}</Row>
                                <Row className='cursor-pointer hover:bg-cyan-400 text-center' onClick={(e) => addTeacher(deList.department_id)}>
                                  <FontAwesomeIcon icon="fa-solid fa-chalkboard-user fa-2x" />
                              </Row>
                                <Row className='cursor-pointer hover:bg-green-400 text-center' onClick={(e) => addStudent(deList.department_id)}>
                                  <FontAwesomeIcon icon="fa-solid fa-graduation-cap" />
                                </Row>
                                <Row className='cursor-pointer hover:bg-orange-400 text-center' onClick={(e) => addCourse(deList.department_id)}>
                                  <FontAwesomeIcon icon="fa-solid fa-book" />
                                </Row>
                                <Row className='cursor-pointer hover:bg-blue-400 text-center' onClick={(e) => addAvailable(deList.department_id)}>
                                  <FontAwesomeIcon icon="fa-solid fa-circle-check" />
                                </Row>
                              </tr>
                          ))
                      }
                      </tbody>
                  </table>   
              ) : (
                  <div className='my-5 h-72'>
                      <h3 className='ml-7 text-xl text-blue-900'>Department Lists</h3>
                      <h2 className='my-4 ml-7 text-md text-blue-600 flex justify-center'>Not Have Department Lists Now</h2>
                  </div>
              )
          }
          </div>
      </div>
    </HelmetProvider>
  )
}
