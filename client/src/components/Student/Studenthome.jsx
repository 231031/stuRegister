import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

const Box = tw.div`w-1/2 h-auto bg-sky  rounded-lg mx-10 py-5 text-center`;
import Headerstu from './Headerstu';
import { getInfo, getGpax, getTotalCredit, getAvgScholar } from '../../helpers/stuhelper';
import { getAllActivitys } from '../../helpers/helper';

// import bg_stu from '../../assets/home9.jpg';
import bg_stu from '../../assets/bghome1.jpg';

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
        <div className='h-80 flex flex-col justify-center text-xl  bg-top  px-20 ' style={{ backgroundImage: `url(${bg_stu})` }}>
          <div className='text-7xl font-semi mb-5 mt-14 text-lowyellow'> Welcome Student </div>
          <div className='text-white text-xl ml-2  '>
          {data?.first_name} {data?.last_name}
          </div>
          <div className='text-white text-xl ml-2'>
            <p>{data?.student_id}</p>
          </div>
          <div>
            <p className='text-white text-xl ml-2'>GPA {gpax}</p>
          </div>
          <div className='text-white text-xl ml-2'>
          <p>Total Credit {credit}</p>
          </div>
        </div>
        <div>
          

          <div className=' flex justify-center flex-row py-10 h-auto bg-slate-100 '>
            {
              (scholar_his.length > 0) ? (
                <Box className='flex flex-col items-center'>
                  <h3 className='font-bold text-lg'>The avg gpax and hours of students who got closed scholarships</h3>
                  <table className='my-2 table-fixed  w-11/12 text-md '>
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
                          <tr key={index} className='w-11/12 bg-slate-200 text-darkgreen rounded- text-sm border-y-8 border-sky'>
                            <td className='py-1'>{sList.scholarship_name}</td>
                            <td className='py-1'>{parseFloat(sList.avg_gpax).toFixed(2)}</td>
                            <td className='py-1'>{parseFloat(sList.avg_hours).toFixed(2)}</td>
                          </tr>

                        ))
                      }
                    </tbody>
                  </table>
                  <button onClick={(e) => handleScholar()}
                    type='button' className='px-4 my-4 bg-slate-200 h-10 text-darkbrown rounded-lg hover:bg-lowyellow hover:text-darkbrown'>Apply</button>

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
                  <table className='my-2table-fixed  w-11/12 text-lg '>
                    <thead>
                      <tr className='font-bold '>
                        <td>Activity Name</td>
                        <td>Limit</td>
                        <td>Get Hours</td>
                        <td>Activity Date</td>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        activity.map((aList, index) => (
                          <tr key={index} className='w-11/12 bg-slate-200 text-darkgre text-sm border-y-8  border-sky'>
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
        <div className='flex justify-center items-center text-lowbrown text-3xl bg-lowyellow h-32'>
          Student Register | KMUTT
        </div>
      </div>
    </HelmetProvider>

  )
}


