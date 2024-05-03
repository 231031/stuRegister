import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import tw from 'twin.macro';

const Box = tw.div`w-1/2 h-3/4 bg-slate-300 rounded-md mx-10 text-center`;
import Headerstu from './Headerstu';

export default function Studenthome() {
  
  const navigate = useNavigate();
  const [data, setData] = useState('');
  const [scholar, setScholar] = useState('');
  const [activity, setActivity] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/student/login');
    }
    const [department_id, year, student_id] = token.split('-');
    setData({
      department_id: department_id,
      year: year,
      student_id: student_id,
    });

    setScholar([
      {
        sName: 'feweffevf',
        money: '200000000',
        date: '2015-11-11'
      },
      {
        sName: 'fewewfvdfvdvfdvd',
        money: '2500',
        date: '2015-11-11'
      }
    ])
  }, []);

  return (
    <HelmetProvider>
      <div className='container h-screen bg-sky-100'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <Helmet>
            <title>Stu | Home</title>
        </Helmet>
        <Headerstu data={data}/>
        <div className='flex flex-col items-center bg-slate-300 py-8'>
          <p className='my-2'>Student ID : {data?.student_id}</p>
          <p className='my-2'>Name : </p>
          <p className='my-2'>GPA : </p>
          <p className='my-2'>Total Credit : </p>
        </div>
        <div className='flex flex-row justify-center items-center h-96'>
          {
            (scholar.length > 0)? (
              <Box className='flex flex-col items-center '>
                  <table className='my-2 table-fixed  w-11/12'>
                    <thead>
                      <tr>
                        <td>Scholarship Name</td>
                        <td>Money</td>
                        <td>Date</td>
                      </tr>
                    </thead>
                    <tbody>
                    {
                        scholar.map((sList, index) => (
                            <tr key={index} className='w-11/12 bg-blue-200 border-y-8 border-slate-300'>
                              <td className='py-1'>{sList.sName}</td>
                              <td className='py-1'>{sList.money}</td>
                              <td className='py-1'>{sList.date}</td>
                            </tr>
                            
                        ))
                    }
                    </tbody>
                  </table> 
                  <button type='button' className='px-4 py-2 bg-blue-400 text-white rounded-lg'>Apply</button>
                
              </Box>
            ) : (
              <Box>
                <p className='mt-5'>No Scholarship Available</p>
              </Box>
            )
          }
          {
            (activity.length > 0)? (
              <Box>
                {/* display activity name date time just three */}
              </Box>
            ) : (
              <Box>
                <p className='mt-5'>No Activity Available</p>
              </Box>
            )
          }
        </div>
        
      </div>
    </HelmetProvider>
    
  )
}

                    
{/* <div className='flex justify-around w-11/12 mt-2'>
                  <p>Name</p>
                  <p>Money</p>
                  <p>Apply In</p>
                </div>
              {
                  scholar.map((sList, index) => (
                      <div key={index} className='bg-blue-100 flex flex-wrap p-2 w-11/12 mt-2 rounded-md justify-around'>
                        <p className='mx-1'>{sList.sName}</p>
                        <p className='mx-1'>{sList.money}</p>
                        <p className='mx-1'>{sList.date}</p>
                      </div>
                  ))
              } */}