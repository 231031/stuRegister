import React, { useState, useEffect } from 'react';
import tw from 'twin.macro';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { getFaculty } from '../../helpers/helper';
import Headeradmin from './Headeradmin';

const Row = tw.td`border border-slate-600 py-1 px-2 text-sm`;
export default function Admintablefac() {

    const [data, setData] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      const apiCall = async () => {
        try {
          const res = await getFaculty();
          setData(res);
        } catch (error) {
            toast.error('Cannot Get Information');
            console.error(error);
        } 
      };
      apiCall();
    }, []);

    function handleAdd(e) {
        navigate('/admin/adddepartment', { state : { faculty_id : e }});
    }
  
    function handleDel(e) {
        // navigate('/admin/adddepartment', { state : { faculty_id : e }});
    }

    function departTable(e) {
        navigate('/admin/departments', { state : { faculty_id : e }});
    }
    
  return (
    <HelmetProvider>
      <div className='bg-indigo-200 h-screen'>
          <Toaster position='top-center' reverseOrder={false}></Toaster>
          <Helmet>
              <title>A | TableFaculty</title>
          </Helmet>
          <Headeradmin/>
          <div className='flex justify-center mt-2'>
          {
              data.length > 0? (
                  <table className='my-2 table-fixed border-collapse border border-slate-500 text-center'>
                      <thead>
                        <tr>
                          <Row>Num</Row>
                          <Row>Faculty ID (Select)</Row>
                          <Row>Faculty Name</Row>
                          <Row>Add Department</Row>
                          <Row>Del Department</Row>
                        </tr>
                      </thead>
                      <tbody>
                      {
                          data.map((facList, index) => (
                              <tr key={index}>
                                <Row>{index+1}</Row>
                                <Row onClick={(e) => departTable(facList.faculty_id)} className='cursor-pointer hover:bg-cyan-600'>{facList.faculty_id}</Row>
                                <Row>{facList.faculty_name}</Row>
                                <Row className='cursor-pointer hover:bg-blue-300'><button className='text-green-600 ' onClick={(e) => handleAdd(facList.faculty_id)}>Add</button></Row>
                                <Row className='cursor-pointer hover:bg-red-300'><button className='text-red-600 ' onClick={(e) => handleDel(facList.faculty_id)}>Del</button></Row>
                              </tr>
                          ))
                      }
                      </tbody>
                  </table>   
              ) : (
                  <div className='my-5 h-72'>
                      <h3 className='ml-7 text-xl text-blue-900'>faculty Lists</h3>
                      <h2 className='my-4 ml-7 text-md text-blue-600 flex justify-center'>Not Have faculty Lists Now</h2>
                  </div>
              )
          }
          </div>
      </div>
    </HelmetProvider>
  )
}
