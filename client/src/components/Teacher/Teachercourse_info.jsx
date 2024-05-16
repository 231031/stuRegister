import React, { useEffect, useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useNavigate, useLocation } from "react-router-dom";

import Headerteacher from "./Headerteacher";

import { getInfoTeacher } from "../../helpers/teacherHelper";
import { getCourse } from "../../helpers/helper";

export default function Teachercourse() {

  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [course, setCourse] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/teacher/login");
    }

    if (location.state) setId(location.state.course_id);
    else navigate("/teacher/selcourse");

    const apiInfo = async () => {
      try {
        const res = await getInfoTeacher(localStorage.getItem("token"));
        setData(res);
      } catch (error) {
        console.error(error);
      }
    };
    apiInfo();
  }, []);

  useEffect(() => {
    const apiCourse = async () => {
      try {
        const res = await getCourse(id);
        setCourse(res);
      } catch (error) {
        console.error(error);
      }
    };
    if (id) apiCourse();
  }, [id]);


  return (
    <div>
      <HelmetProvider>
        <Helmet>
            <title>T | InfoCourse</title>
        </Helmet> 
      </HelmetProvider>
      <Headerteacher data={data} />


      {/* <----textheader----> */}
      <div className='container px-2 py-24 mx-auto'>
        <div id="feedbackModal" className="feedbackModal">
                <div className="modalContent">
                  <h1 className="text-center text-3xl font-semibold capitalize text-sky dark:text-sky lg:text-4xl">{course?.course_id}: {course?.course_name}</h1>
                  <h2 style={{ textAlign: 'center', marginTop: '0px' }}>KMUTT UNIVERSITY</h2>


                  <div className = 'container mt-3'>
                      <h1  className='text-center  text-gray-600 text-2xl  '>DESCRIPTION</h1><br />
                      <p className='text-center'>{course?.description}</p>
                  </div>
                </div>
          </div>
        





      
      
      
      </div>
      
      
    </div>

  )
}
