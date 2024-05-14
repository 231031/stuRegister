import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

const Box = tw.div`w-1/2 h-3/4 bg-lowbrown rounded-md mx-10 text-center`;
import Headerstu from './Headerstu';
import { getInfo, getGpax, getScholar } from '../../helpers/stuhelper';
import { getAllActivitys } from '../../helpers/helper';

export default function Studenthome() {

  const navigate = useNavigate();
  const [data, setData] = useState('');
  const [scholar, setScholar] = useState('');
  const [activity, setActivity] = useState('');
  const [gpax, setGpax] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/student/login');
    }
    const fetchData = async () => {
      try {
        const [infoRes, gpaxRes, scholarRes, activityRes] = await Promise.all([
          getInfo(),
          getGpax(),
          getScholar(),
          getAllActivitys(),
        ]);

        setData(infoRes);
        setGpax(gpaxRes.gpax);
        setScholar(scholarRes);
        setActivity(activityRes);
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
          <div className='flex flex-col justify-first items-center bg-sky py-8'>
            <p className='my-2'>Student ID : {data?.student_id}</p>
            <p className='my-2'>Name : {data?.first_name} {data?.last_name}</p>
            <p className='my-2'>GPA : {gpax}</p>
            <p className='my-2'>Total Credit : </p>
          </div>
          <div className=' flex justify-center flex-row items-center h-96 '>
            {
              (scholar.length > 0) ? (
                <Box className='flex flex-col items-center'>
                  <table className='my-2 table-fixed  w-11/12 text-sm text-white'>
                    <thead>
                      <tr className='font-bold'>
                        <td>Scholarship Name</td>
                        <td>Limit</td>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        scholar.map((sList, index) => (
                          <tr key={index} className='w-11/12 bg-sky text-darkgreen border-y-8 border-lowbrown'>
                            <td className='py-1'>{sList.scholarship_name}</td>
                            <td className='py-1'>{sList.finite}</td>
                          </tr>

                        ))
                      }
                    </tbody>
                  </table>
                  <button onClick={(e) => handleScholar()}
                    type='button' className='px-4 py-2 bg-sky text-darkgreen rounded-lg'>Apply</button>

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
                  <table className='my-2 table-fixed  w-11/12 text-sm text-white'>
                    <thead>
                      <tr className='font-bold'>
                        <td>Activity Name</td>
                        <td>Limit</td>
                        <td>Get Hours</td>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        activity.map((aList, index) => (
                          <tr key={index} className='w-11/12 bg-sky text-darkgreen border-y-8 border-lowbrown'>
                            <td className='py-1'>{aList.activity_name}</td>
                            <td className='py-1'>{aList.finite}</td>
                            <td className='py-1'>{aList.hours}</td>
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


