import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';

import profile from '../../assets/profile.png';
import Headerstu from './Headerstu';
import { getInfo, getStuRegister } from '../../helpers/stuhelper';

const Row = tw.td`border-2 border-greendark py-1 text-sm`;
export default function Studentmycourse() {

    const navigate = useNavigate();
    const [data, setData] = useState('');
    const [term, setTerm] = useState(2); // current term
    const [month, setMonth] = useState(0); // current month

    // selected
    const [selY, setSelY] = useState('');
    const [selT, setSelT] = useState('');
    const [regis, setRegis] = useState('');

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/student/login');
      }
      const [department_id, year, student_id] = token.split('-');

      const month = new Date().getMonth()
      setMonth(month);
      if (month >= 7) setTerm(1); // month 7 is August 1

      const apiInfo = async () => {
        try {
          const res = await getInfo(student_id);
          setData(res);
        } catch (error) {
          console.log(error);
        }
      }
      if (student_id) apiInfo(); 
    }, []);

    useEffect(() => {
      const apiRegis = async () => {
        try {
          const res = await getStuRegister(selT, selY);
          setRegis(res);
        } catch (error) {
          console.log(error);
        }
      }
      if (selT && selY) apiRegis();

    }, [selT, selY]);

    function clickDetail(e) {
      navigate('/student/courses', { state : { course_id : e }});
    }

    function clickChange(e) {
      navigate('/student/changegroup', { state : { term : term }});
    }

    function clickDel(e) {
      navigate('/student/delcourse', { state : { term : term }});
    }

  return (
    <HelmetProvider>
      <div>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <Helmet>
            <title>Stu | MyCourse</title>
        </Helmet> 
        <Headerstu data={data}/>
        <div className='flex bg-lowyellow'>
          <div className='w-1/4 bg-slate-300 h-[calc(100vh-40px)] p-10'>
            <div className='flex flex-col items-center my-10'>
              <img className='rounded-full w-1/2 h-1/2 border-2 border-sky' src={profile}/>
            </div>
            <div className='flex flex-row flex-wrap justify-between'>
                <p>Student ID</p>
                <p>{data?.student_id}</p>
              </div>
              <div className='flex flex-row flex-wrap justify-between'>
                <p>Year</p>
                <p>{data?.year}</p>
              </div>
              <div className='flex flex-row flex-wrap justify-between'>
                <p>Department</p>
                <p>{data?.department_id}</p>
              </div>
          </div>

          <div className='w-full flex flex-col items-center'>
              <div className='flex flex-row mt-10 w-1/4 ml-20'>
                <p className='mr-8'>Year</p>
                {
                  (data?.year) ? (
                    <select className='text-white w-1/2 bg-greendark border-0 rounded-md' onChange={(e)=>setSelY(e.target.value)}>
                      <option value=''></option>
                      {
                        Array.from({ length: data.year }, (_, index) => index + 1).map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))
                      }
                    </select>
                  ) : (
                    <p className='text-red-500'>Not Have Year Available</p>
                  )
                }
              </div>

              <div className='flex flex-row mt-10 w-1/4'>
                <p className='mr-8'>Semester</p>
                <select className='text-white w-1/2 bg-greendark border-0 rounded-md' onChange={(e)=>setSelT(e.target.value)}>
                  <option value=''></option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                </select>
              </div>


              <div className='mt-10 w-5/6'>
              {
                (regis.length > 0)? (
                  <div className='w-full flex flex-col justify-center items-center'>
                    <p className='text-lg'>Compulsory Courses</p>
                    <table className='text-center w-11/12 border-2 border-sky mt-10'>
                    <thead>
                      <tr>
                        <Row>ID</Row>
                        <Row>Course Name</Row>
                        <Row>Group</Row>
                        <Row>Processor</Row>
                        <Row>Room</Row> 
                        <Row>More Detail</Row>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      regis.map((rList, index) => (
                        <tr key={index}>
                          <Row>{rList.course_id}</Row>
                          <Row>{rList.course_name}</Row>
                          <Row>{rList.gr}</Row>
                          <Row>{rList.teacher_id}</Row>
                          <Row>{rList.class_id}</Row>
                          <Row className='hover:bg-orange-300 cursor-pointer '>
                            <button className='italic' type='button' onClick={(e)=>clickDetail(rList.course_id)}>More Detail</button>
                          </Row>
                        </tr>
                        
                          
                      ))
                    }
                    </tbody>
                    </table>
                  </div>
                  
                ) : (
                    <div className='flex flex-col items-center w-full'>
                      <p className='text-red-500'>Not Have Register Course Now</p>
                    </div>
                )
              } 
              </div>

              {/* term 1 -> change group and delete course in month 8 | term 2 -> change group and delete in month 1 */}
              {/* data.year = selected year and term = selected term then button change group and delete course will display */}
              {
                (data?.year == selY && term == selT && (term == 1 && month + 1 == 8) || (term == 2 && month + 1 == 1)) ? (
                  <div className='flex flex-row mt-14'>
                    <button className='mx-10 px-5 py-1 bg-greendark text-white rounded-md hover:bg-sky'
                    onClick={(e)=>clickChange()}>Change Group</button>
                    <button className='mx-10 px-5 py-1 bg-greendark text-white rounded-md hover:bg-sky'
                    onClick={(e)=>clickDel()}>Withdraw Course</button>  
                  </div>
                ) : (
                  <p></p>
                )
              }
          </div>

          

          
        </div>
        </div>
    </HelmetProvider>
  )
}
