import React, { useState, useEffect } from 'react';
import tw from 'twin.macro';
import toast, { Toaster } from 'react-hot-toast';

import Header from './Header';
import { getStudent } from '../helpers/stuhelper';

const Row = tw.td`border border-slate-600 p-1 text-sm`;
export default function Studentinfo() {
    const [data, setData] = useState(null);

    useEffect(() => {
      const apiCall = async () => {
        try {
          const res = await getStudent();
          setData(res);
        } catch (error) {
            toast.error('Cannot Get Information');
            console.error(error);
        } 
      };
      apiCall();
    }, []);
  
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
                        <Row>Number</Row>
                        <Row>Student ID</Row>
                        <Row>First Name</Row>
                        <Row>Last Name</Row>
                      </tr>
                    </thead>
                    <tbody>
                    {
                        data.map((stuList, index) => (
                            <tr key={index}>
                              <Row>{index+1}</Row>
                              <Row>{stuList.student_id}</Row>
                              <Row>{stuList.firstName}</Row>
                              <Row>{stuList.lastName}</Row>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>   
            ) : (
                <div className='my-5 h-72'>
                    <h3 className='ml-7 text-xl text-blue-900'>Student Lists</h3>
                    <h2 className='my-4 ml-7 text-md text-blue-600 flex justify-center'>Not Have Student Lists Now</h2>
                </div>
            )
        }
        </div>
      </div>
    );
};
