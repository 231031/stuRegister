import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import tw from 'twin.macro';

import Headerstu from './Headerstu';
import { getInfo, changeGroup, getStuRegisterChange } from '../../helpers/stuhelper';
import profile from '../../assets/profile.png';

const Row = tw.td`border-2 border-greendark py-1 text-sm`;
export default function Studentchangegroup() {

  const navigate = useNavigate();
    const [data, setData] = useState('');
    const [term, setTerm] = useState(2); // current term

    const [regis, setRegis] = useState('');

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/student/login');
      }
      const [department_id, year, student_id] = token.split('-');

      const month = new Date().getMonth()
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
          const res = await getStuRegisterChange(term);
          setRegis(res);
        } catch (error) {
          console.log(error);
        }
      }
      if (term) apiRegis();

    }, [term]);

    function clickDetail(e) {
      navigate('/student/courses', { state : { course_id : e }});
    }

    function handleUpdate() {

    }
    
    async function handleClick() {
      try {
        const res = await changeGroup();
        toast.success(res.msg);
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <HelmetProvider>
      <div>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <Helmet>
            <title>Stu | ChangeGroup</title>
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
              <div className='mt-10 w-5/6'>
              {
                (regis.length > 0)? (
                  <div className='w-full flex flex-col justify-center items-center'>
                    <p className='text-lg'>Change Group</p>
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
              
              <button className='my-10 px-3 py-1 bg-greendark rounded-md' onClick={(e)=>handleClick()}>SUBMIT</button>


          </div>

          

          
        </div>
        </div>
    </HelmetProvider>
  )
}