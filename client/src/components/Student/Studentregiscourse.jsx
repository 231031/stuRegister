import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import tw from 'twin.macro';

import Headerstu from './Headerstu';
import { getAvailableCourse, getInfo } from '../../helpers/stuhelper';
import sry from '../../assets/sry.png';

const Row = tw.td`border-2 border-sky-600 py-0 text-sm`;
export default function Studentregiscourse() {

  const navigate = useNavigate();
  const [data, setData] = useState('');
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [available, setAvailable] = useState('');
  const [list, setList] = useState([]);
  const [sel, setSel] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/student/login');
    } 
    const [department_id, year, student_id] = token.split('-');

    const apiInfo = async () => {
      try {
        const res = await getInfo(student_id);
        setData(res);
      } catch (error) {
        console.log(error);
      }
    }
    if (student_id) apiInfo();    

    setDate(new Date().getDate());
    setMonth(new Date().getMonth());
  }, []);

  useEffect(() => {
      const apiCourse = async () => {
        try {
          if (month == 4 && date < 15) {
            const detail = await getAvailableCourse(data.department_id, data.year, 'compulsory');
            setAvailable(detail); 
          } 
        } catch (error) {
            toast.error('Cannot Get Information');
            console.error(error);
        } 
      }
      if (data) apiCourse();
  }, [data]);

  function handleClick() {
    navigate('/student/courses')
  }

  function selCourseGroup(id, group, index, ind) {
    // Update the list state
    setList((prevList) => {
      const updatedList = [...prevList];
      updatedList[ind] = index - 1;
      return updatedList;
    });
  
    // Update the sel state
    setSel((prevSel) => {
      const updatedSel = [...prevSel];
      if (updatedSel[ind] === undefined) {
        updatedSel.push({
          course_id: id,
          group: group,
        });
      } else {
        updatedSel[ind] = {
          course_id: id,
          group: group,
        };
      }
      return updatedSel;
    });
  }

  function handleSubmit() {
    // sent sel object to register course in model Sturegister
    // do not forgot push student_id in each object of array
  }
  

  return (
    <HelmetProvider>
      <div className='container'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <Helmet>
            <title>Stu | RegisterCourse</title>
        </Helmet>
        <Headerstu data={data}/>
        <div className='flex flex-row'>
          <div className='w-1/4 bg-slate-300 h-[calc(100vh-40px)] p-10'>
            <div className='flex flex-col items-center my-10'>
              <img className='rounded-full w-1/2 h-1/2 border-2 border-blue-900' src={sry}/>
            </div>
            <div className='flex flex-row justify-between'>
                <p>Student ID</p>
                <p>{data?.student_id}</p>
              </div>
              <div className='flex flex-row justify-between'>
                <p>Year</p>
                <p>{data?.year}</p>
              </div>
              <div className='flex flex-row justify-between'>
                <p>Department</p>
                <p>{data?.department_id}</p>
              </div>
            
            
          </div>
          {
            (month == 4 && date < 15) ? (
              <div className='w-3/4 flex'>
              {
                (available.length > 0)? (
                  <div className='w-full flex flex-col justify-center items-center'>
                    <table className='text-center w-11/12 border-2 border-sky-600'>
                    <thead>
                      <tr>
                        <Row>ID</Row>
                        <Row>Course Name</Row>
                        <Row>Select Group</Row>
                        <Row>Processor</Row>
                        <Row>Room</Row> 
                        <Row>More Detail</Row>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      available.map((aList, ind) => (
                        <tr key={ind}>
                          <Row>{aList.course_id}</Row>
                          <Row>{aList.courseName}</Row>
                          <Row>
                            <select className='border-2 border-sky-600 rounded-md my-3 w-1/3' 
                            type='text'  id='group' onChange={(e)=>selCourseGroup(aList.course_id, e.target.value, e.target.selectedIndex, ind)}>
                                <option value=''></option>
                                { 
                                  aList.Coursedetails.map((gList, index) => (
                                    <option key={index} value={gList.group} >
                                      {gList.group}
                                    </option>
                                  ))
                                }
                            </select> 
                          </Row>
                          <Row>
                              {aList.Coursedetails[list[ind]]?.teacher_id}
                          </Row>
                          <Row>
                              {aList.Coursedetails[list[ind]]?.class_id}
                          </Row>
                          <Row>
                            <Link>More Detail</Link>
                            {/* Link to page detail of this course fetch detail of this course */}
                          </Row>
                        </tr>
                        
                          
                      ))
                    }
                    </tbody>
                    </table>
                    <button className='mt-10 py-1 px-2 bg-teal-500 rounded-md border-2 border-slate-500' 
                    type='button' onClick={(e)=>handleSubmit()}>SUBMIT</button>
                  </div>
                  
                ) : (
                  <div className='w-3/4 flex justify-center items-center'>
                    <p>Not Have Available Course Now</p>
                  </div>
                )
              } 
              </div>
            ) : (
              <div className='h-screen flex flex-col items-center justify-center'>
                <img src={sry} className='w-1/6'/>
                <p className='my-5'>Sorry, we're not in registration period</p>
                <button className='p-3 bg-slate-400 text-white rounded-md' type='button' onClick={(e)=>handleClick()}>Preview Course Detail</button>
              </div>
            )
          }
        </div>
        
        
      </div>
    </HelmetProvider>
  )
}

