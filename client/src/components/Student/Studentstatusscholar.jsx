import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import tw from 'twin.macro';

import { getInfo, getStutusScholar } from '../../helpers/stuhelper';
import Headerstu from './Headerstu';

const Row = tw.td`border-2 border-sky py-1 text-sm`;
export default function Studentstatusscholar() {

  const navigate = useNavigate();
  const [data, setData] = useState('');
  const [scholar, setScholar] = useState('');

  // selected
  const [selY, setSelY] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/student/login');
    }
    const apiInfo = async () => {
      try {
        const res = await getInfo();
        setData(res);
      } catch (error) {
        console.log(error);
      }
    }
    apiInfo();

  }, []);

  useEffect(() => {
    const apiScholar = async () => {
      try {
        const res = await getStutusScholar(selY, data.year);
        setScholar(res);
      } catch (error) {
        console.log(error);
      }
    }
    if (selY) apiScholar();

  }, [selY]);


  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <title>Stu | Scholar Status</title>
        </Helmet>
        <Headerstu data={data} />

        <div className='flex mt-20 bg-white h-[calc(100vh-40px)]'>
          <div className='w-full flex flex-col items-center'>
            <div className='flex flex-row mt-10 w-1/4 ml-20'>
              <p className='mr-8'>Year</p>
              {
                (data?.year) ? (
                  <select className='text-white w-1/2 bg-darkbrown border-0 rounded-md' onChange={(e) => setSelY(e.target.value)}>
                    <option value=''></option>
                    {
                      Array.from({ length: new Date().getFullYear() + 543 - data?.year }, (_, index) => index + 1).map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))
                    }
                  </select>
                ) : (
                  <p className=' text-red-500'>Not Have Year Available</p>
                )
              }
            </div>


            <div className='mt-10 w-5/6'>
              {
                (scholar.length > 0) ? (
                  <div className='w-full flex flex-col justify-center items-center'>
                    <p className='text-lg font-bold'>Scholarship History</p>
                    <table className='text-center w-11/12 border-2 border-sky mt-5'>
                      <thead>
                        <tr className='font-bold'>
                          <Row>Scholarship Name</Row>
                          <Row>Status</Row>
                          <Row>Result</Row>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          scholar.map((sList, index) => (
                            <tr key={index}>
                              <Row>{sList.scholarship_name}</Row>
                              <Row className='font-bold'>
                                {
                                  (sList.status == 1) ? (
                                    <p>Announced</p>
                                  ) : (
                                    <p>Not yet announced</p>
                                  )
                                }
                              </Row>
                              <Row className='font-bold'>
                                {
                                  (sList.approve == 1) ? (
                                    <p className='text-emerald-600'>Pass</p>
                                  ) : (
                                    <p className='text-red-600'>Reject</p>
                                  )
                                }
                              </Row>
                            </tr>


                          ))
                        }
                      </tbody>
                    </table>
                  </div>

                ) : (
                  <div className='flex flex-col items-center w-full'>
                    <p className='text-red-500 italic font-bold'>Please Select Year First</p>
                    <p className='text-red-500 italic font-bold'>You doesn't have any scholarship</p>
                  </div>
                )
              }
            </div>
          </div>




        </div>
      </div>
    </HelmetProvider>
  )
}
