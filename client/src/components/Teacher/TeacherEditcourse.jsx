import React, { useEffect, useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from 'formik';
import toast, { Toaster }  from 'react-hot-toast';

import Headerteacher from "./Headerteacher";

import { getInfoTeacher, getCourse, editCourse } from "../../helpers/teacherHelper";
import { CourseUpdateSchema } from '../../Validations/validation';

export default function TeacherEditcourse() {
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

  const formik = useFormik({
    initialValues: {
        course_name: course?.course_name || '',  
        description: course?.description || '',
    },
    validationSchema: CourseUpdateSchema,
    onSubmit: async (values) => {
        try {
            const res = await editCourse(values, id);
            toast.success(res.msg);
        } catch (error) {
            console.log(error);
            toast.error('You registered this scholarship');
        }
    },
    enableReinitialize: true,
  });


  return (
    <div>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <HelmetProvider>
        <Helmet>
            <title>T | EditCourse</title>
        </Helmet> 
      </HelmetProvider>
      <Headerteacher data={data} />

      {/* <----textheader----> */}
      <div className="container px-2 py-24 mx-auto">
        <div id="feedbackModal" className="feedbackModal">
          <div className="modalContent">
            <h1 className="text-center text-3xl font-semibold capitalize text-sky dark:text-sky lg:text-4xl">
              Edit Course
            </h1>
            <h2 style={{ textAlign: "center", marginTop: "0px" }}>
              KMUTT UNIVERSITY
            </h2>

            <div className="container mt-3">
              <h1 className="text-center  text-gray-600 text-2xl  ">
                Edit Information & Course Name
              </h1>
              <br />
            </div>
          </div>
        </div>

        {/* <---editblock---> */}

        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200">
            <div className="flex-auto p-5 lg:p-10">
              <h4 className="text-2xl mb-4 text-black font-semibold">
                Update your course here
              </h4>
              <form id="feedbackForm" onSubmit={formik.handleSubmit}>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                    Name
                  </label>
                  <input
                    name="course_name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.course_name}
                    type="course_name"
                    id="course_name"
                    className="border-0 px-3 py-3 rounded text-sm shadow w-fullbg-gray-300 placeholder-black text-gray-800 outline-none focus:bg-gray-400"
                    required
                  />
                  {formik.touched.course_name && formik.errors.course_name ? (
                            <p className="text-red-500 text-xs italic">{formik.errors.course_name}</p>
                        ) : null}
                </div>

                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    maxlength="300"
                    id="feedback"
                    rows="4"
                    cols="80"
                    className="border-0 px-3 py-3  placeholder-black text-gray-800 rounded text-sm shadow focus:outline-none w-full"
                    placeholder=""
                    required
                  ></textarea>
                    {formik.touched.description && formik.errors.description ? (
                              <p className="text-red-500 text-xs italic">{formik.errors.description}</p>
                          ) : null}
                </div>
                <div className="text-center mt-6">
                  <button
                    id="feedbackBtn"
                    className="bg-sky text-white text-center mx-auto active:bg-gray-400 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    mtype="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
