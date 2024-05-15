import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import tw from 'twin.macro';

import profile from '../../assets/profile.png';
import Headerstu from './Headerstu';
import { getInfo, getStuRegisterDel, delStuCourse } from '../../helpers/stuhelper';

const Row = tw.td`border-2 border-greendark py-1 text-sm`;

export default function Studentdelcourse() {

    const location = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState('');
    const [term, setTerm] = useState(2); // current term

    // selected
    const [regis, setRegis] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/student/login');
        }
  
        if (location.state) setTerm(location.state.term);
        else navigate('/student/mycourse');

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
        const apiRegis = async () => {
          try {
              const res = await getStuRegisterDel(term);
              setRegis(res);
          } catch (error) {
              console.log(error);
          }
        };
        if (term) apiRegis();
    }, [term]);

    function clickDetail(e) {
      navigate('/student/moredetail', { state: { course_id: e } });
    }

    async function delCourse(id, group, credit) {
        try {
          const confirmed = window.confirm("Are you sure you want to delete this course?");
          const detail = {
            'course_id': id,
            'gr': group,
            'credit': credit,
            'year': data?.year,
            'term': term
          }

          if (confirmed) {
            const res = await delStuCourse(detail);
            toast.success(res.msg);  
            window.location.reload();
          }
          
        } catch (error) {
          console.log(error);
        }
    }


  return (
    <HelmetProvider>
      <div>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <Helmet>
            <title>Stu | DelCourse</title>
        </Helmet> 
        <Headerstu data={data}/>
        <div className='h-screen flex bg-lowyellow'>
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
                    <p className='text-lg'>Delete Courses</p>
                    <table className='text-center w-11/12 border-2 border-sky mt-10'>
                    <thead>
                      <tr>
                        <Row>ID</Row>
                        <Row>Course Name</Row>
                        <Row>Group</Row>
                        <Row>Processor</Row>
                        <Row>Room</Row> 
                        <Row>More Detail</Row>
                        <Row>WithDraw</Row>
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
                          <Row>
                            <button type='button' className='my-1 px-5 py-1 bg-red-700 text-white rounded-md hover:bg-sky'
                            onClick={(e)=>delCourse(rList.course_id, rList.gr, rList.credit)}>DELETE</button>
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
              


          </div>

          

          
        </div>
        </div>
    </HelmetProvider>
  )
}
