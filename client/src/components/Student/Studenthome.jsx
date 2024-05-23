import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

const Box = tw.div`w-1/2 h-3/4 bg-lowbrown rounded-2xl mx-10 pt-3 text-center`;
import Headerstu from './Headerstu';
import { getInfo, getGpax, getTotalCredit, getAvgScholar } from '../../helpers/stuhelper';
import { getAllActivitys } from '../../helpers/helper';

import bg_stu from '../../assets/home9.jpg';

export default function Studenthome() {

  const navigate = useNavigate();
  const [data, setData] = useState('');
  const [activity, setActivity] = useState('');
  const [gpax, setGpax] = useState('');
  const [credit, setCredit] = useState('');
  const [scholar_his, setScholarHis] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/student/login');
    }

    const fetchData = async () => {
      try {

        const [infoRes, gpaxRes, activityRes, creditRes, avgScholar] = await Promise.all([
          getInfo(),
          getGpax(),
          getAllActivitys(),
          getTotalCredit(),
          getAvgScholar(),
        ]);

        setData(infoRes);
        setGpax(gpaxRes.gpax);
        setActivity(activityRes);
        setCredit(creditRes.total_credit);
        setScholarHis(avgScholar);

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
        <div className='h-80 flex flex-row justify-center items-center text-xl py-8 bg-cover bg-center ;' style={{ backgroundImage: `url(${bg_stu})` }}>


        </div>
        <div>
          <div className='flex flex-row justify-center bg-white p-5 rounded-2xl w-fullscreen '>
            <div className='flex flex-col justify-center w-1/3'>
              <div className=' flex p-2 justify-between my-2'>
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

          <div className=' flex justify-center flex-row items-center h-auto '>
            {
              (scholar_his.length > 0) ? (
                <Box className='flex flex-col items-center'>
                  <h3 className='font-bold text-white text-lg'>Scholarship Histoty</h3>
                  <table className='my-2 table-fixed  w-11/12 text-md text-white'>
                    <thead>
                      <tr className='font-bold'>
                        <td>Scholarship Name</td>
                        <td>Average GPAX</td>
                        <td>Average Hours</td>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        scholar_his.map((sList, index) => (
                          <tr key={index} className='w-11/12 bg-sky text-darkgreen text-sm border-y-8 border-lowbrown'>
                            <td className='py-1'>{sList.scholarship_name}</td>
                            <td className='py-1'>{parseFloat(sList.avg_gpax.toFixed(2))}</td>
                            <td className='py-1'>{sList.avg_hours}</td>
                          </tr>

                        ))
                      }
                    </tbody>
                  </table>
                  <button onClick={(e) => handleScholar()}
                    type='button' className='px-4 my-4 bg-sky text-darkbrown rounded-lg hover:bg-lowyellow hover:text-darkbrown'>Apply</button>

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
        </div>
        {/* </div> */}
      </div>
    </HelmetProvider>

  )
}


