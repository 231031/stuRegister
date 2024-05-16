import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

const Box = tw.div`w-1/2 h-3/4 bg-lowbrown rounded-2xl mx-10 pt-3 text-center`;
import Headerstu from './Headerstu';
import { getInfo, getGpax, getScholar, getTotalCredit } from '../../helpers/stuhelper';
import { getAllActivitys } from '../../helpers/helper';

import bg_stu from '../../assets/bg_stu.png';

export default function Studenthome() {

  const navigate = useNavigate();
  const [data, setData] = useState('');
  const [scholar, setScholar] = useState('');
  const [activity, setActivity] = useState('');
  const [gpax, setGpax] = useState('');
  const [credit, setCredit] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/student/login');
    }

    const fetchData = async () => {
      try {
        const [infoRes, gpaxRes, scholarRes, activityRes, creditRes] = await Promise.all([
          getInfo(),
          getGpax(),
          getScholar(),
          getAllActivitys(),
          getTotalCredit(),
        ]);

        setData(infoRes);
        setGpax(gpaxRes.gpax);
        setScholar(scholarRes);
        setActivity(activityRes);
        setCredit(creditRes.total_credit);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

  }, []);

  function handleScholar() {
    navigate('/student/StudentScholarform');
  }

  return (
    <HelmetProvider>
      <div >
        <Helmet>
          <title>Stu | Home</title>
        </Helmet>
        <Headerstu data={data} />
        {/* <div className='flex'> */}
          <div className='flex flex-col justify-first items-center text-xl py-8' style={{backgroundImage: `url(${bg_stu})`}}>
            <div className='bg-white p-5 rounded-2xl w-1/3 '>
              <div className=' flex  p-2 justify-between my-2'>
                <p className='font-semibold '>Student ID </p>
                <p>{data?.student_id}</p>
              </div>
              <div className=' flex  p-2 justify-between my-2'>
                <p className='font-semibold'>Name</p>
                <p >{data?.first_name} {data?.last_name}</p>
              </div>
              <div className='flex p-2 justify-between my-2'>
                <p className='font-semibold'>GPA </p>
                <p >{gpax}</p>
              </div>
              <div className='flex justify-between p-2 my-2'>
                <p className='font-semibold'>Total Credit</p>
                <p>{credit}</p>
              </div>
            </div>
            
          </div>
          <div className=' flex justify-center flex-row items-center h-96 '>
            {
              (scholar.length > 0) ? (
                <Box className='flex flex-col items-center'>
                  <table className='my-2 table-fixed  w-11/12 text-lg text-white'>
                    <thead>
                      <tr className='font-bold'>
                        <td>Scholarship Name</td>
                        <td>Limit</td>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        scholar.map((sList, index) => (
                          <tr key={index} className='w-11/12 bg-sky text-darkgreen text-sm border-y-8 border-lowbrown'>
                            <td className='py-1'>{sList.scholarship_name}</td>
                            <td className='py-1'>{sList.finite}</td>
                          </tr>

                        ))
                      }
                    </tbody>
                  </table>
                  <button onClick={(e) => handleScholar()}
                    type='button' className='px-4 py-2 bg-sky text-darkgreen rounded-lg hover:bg-lowgreen hover:text-white'>Apply</button>

                </Box>
              ) : (
                <Box>
                  <p className='mt-5'>No Scholarship Available</p>
                </Box>
              )
            }
            {
              (activity.length > 0) ? (
                <Box className='flex flex-col items-center '>
                  <table className='my-2 table-fixed  w-11/12 text-lg text-white'>
                    <thead>
                      <tr className='font-bold'>
                        <td>Activity Name</td>
                        <td>Limit</td>
                        <td>Get Hours</td>
                        <td>Activity Date</td>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        activity.map((aList, index) => (
                          <tr key={index} className='w-11/12 bg-sky text-darkgreen text-sm border-y-8 border-lowbrown'>
                            <td className='py-1'>{aList.activity_name}</td>
                            <td className='py-1'>{aList.finite}</td>
                            <td className='py-1'>{aList.hours}</td>
                            <td className='py-1'>{aList?.date_ac ? new Date(aList.date_ac).toISOString().split('T')[0] : ""}</td>
                          </tr>

                        ))
                      }
                    </tbody>
                  </table>

                </Box>
              ) : (
                <Box>
                  <p className='mt-5'>No Activity Available</p>
                </Box>
              )
            }
          </div>
        {/* </div> */}
      </div>
    </HelmetProvider>

  )
}


