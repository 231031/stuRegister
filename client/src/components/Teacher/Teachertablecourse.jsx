import React, { useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";

import Headerteacher from "./Headerteacher";

import { getCourseTeacher, getInfoTeacher } from "../../helpers/teacherHelper";

export default function Teachertablecourse() {
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [course, setCourse] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/teacher/login"); 
    }

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
        const res = await getCourseTeacher(data?.teacher_id);
        setCourse(res);
      } catch (error) {
        console.error(error);
      }
    };
    if (data) apiCourse();
  }, [data]);

  function handleClick(path, id) {
    navigate(path, { state: { course_id: id } });
  }

  return (
    <div>
      <HelmetProvider>
        <Headerteacher data={data} />
      </HelmetProvider>

      {/* <----textheader----> */}
      <div className="container px-2 py-24 mx-auto">
        <div id="feedbackModal" className="feedbackModal">
          <div className="modalContent">
            <h1 className="text-center text-3xl font-semibold capitalize text-sky dark:text-sky lg:text-4xl">
              My Course
            </h1>
            <h2 style={{ textAlign: "center", marginTop: "0px" }}>
              KMUTT UNIVERSITY
            </h2>

            <div className="container mt-3">
              <h1 className="text-center  text-gray-600  ">
                Enhancing Your Learning Journey: Manage My Course
              </h1>
              <br />
            </div>
          </div>
        </div>

        {/* <----table------> */}

        <div className="grid-cols-2">
          <div className=" pt-10 overflow-x-auto sm:mx-0.5 lg:mx-0.5">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                {course.length > 0 ? (
                  <table className="min-w-full">
                    <thead className="bg-sky border-b">
                      <tr>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          My course
                        </th>

                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      {course.map((cList, index) => (
                        <tr
                          key={index}
                          className="bg-slate-100 border-b transition duration-300 ease-in-out hover:bg-gray-100"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            1
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {cList.course_id} : {cList.course_name}
                          </td>

                          <div class="flex flex-row-reverse mr-10 pt-1">
                            <button
                              onClick={(e) =>
                                handleClick(
                                  "/teacher/teacherEditcourse",
                                  cList.course_id
                                )
                              }
                              className="bg-darkbrown hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border border-[#94a3b8] hover:border-transparent rounded mr-1"
                            >
                              Edit
                            </button>

                            <button
                              onClick={(e) =>
                                handleClick(
                                  "/teacher/teacherscore",
                                  cList.course_id
                                )
                              }
                              className="bg-lowbrown hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border border-[#94a3b8] hover:border-transparent rounded mr-1"
                            >
                              Submit Score
                            </button>

                            <button
                              onClick={(e) =>
                                handleClick(
                                  "/teacher/teachercourse_info",
                                  cList.course_id
                                )
                              }
                              className="bg-[#9ca3af] hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border border-[#94a3b8] hover:border-transparent rounded mr-1"
                            >
                              Infomation
                            </button>
                          </div>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex flex-col items-center">
                    <p className="text-red-500">
                      Not Have Course in Your Response
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              GEN111 : Man and Ethic of living
              </td>
              
              
              <div class ='flex flex-row-reverse mr-10 pt-1'>

              <button className="bg-[#9ca3af] hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border border-[#94a3b8] hover:border-transparent rounded mr-1">
                <Link to="/teacher/teacherEditcourse" className="block w-full h-full">
                Edit
                </Link>
              </button>

              <button className="bg-[#9ca3af] hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border border-[#94a3b8] hover:border-transparent rounded mr-1">
                <Link to="/teacher/teacherscore" className="block w-full h-full">
                Submit Score
                </Link>
              </button>

              <button className="bg-[#9ca3af] hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border border-[#94a3b8] hover:border-transparent rounded mr-1">
                <Link to="/teacher/teachercourse_info" className="block w-full h-full">
                Infomation
                </Link>
              </button>

              </div>
              
            </tr>
      
            <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">4</td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              CPE 223: COMPUTER ARCHITECTURES
              </td>


              <div class ='flex flex-row-reverse mr-10 pt-1'>

              <button className="bg-[#9ca3af] hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border border-[#94a3b8] hover:border-transparent rounded mr-1">
                <Link to="/teacher/teacherEditcourse" className="block w-full h-full">
                Edit
                </Link>
              </button>

              <button className="bg-[#9ca3af] hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border border-[#94a3b8] hover:border-transparent rounded mr-1">
                <Link to="/teacher/teacherscore" className="block w-full h-full">
                Submit Score
                </Link>
              </button>

              <button className="bg-[#9ca3af] hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border border-[#94a3b8] hover:border-transparent rounded mr-1">
                <Link to="/teacher/teachercourse_info" className="block w-full h-full">
                Infomation
                </Link>
              </button>

              </div>
              
            </tr>

            <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">5</td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              STA 302 : STATISTICS FOR ENGINEERS
              </td>

              <div class ='flex flex-row-reverse mr-10 pt-1'>

              <button className="bg-[#9ca3af] hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border border-[#94a3b8] hover:border-transparent rounded mr-1">
                <Link to="/teacher/teacherEditcourse" className="block w-full h-full">
                Edit
                </Link>
              </button>

              <button className="bg-[#9ca3af] hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border border-[#94a3b8] hover:border-transparent rounded mr-1">
                <Link to="/teacher/teacherscore" className="block w-full h-full">
                Submit Score
                </Link>
              </button>

              <button className="bg-[#9ca3af] hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 pt-1 border border-[#94a3b8] hover:border-transparent rounded mr-1">
                <Link to="/teacher/teachercourse_info" className="block w-full h-full">
                Infomation
                </Link>
              </button>

              </div>
              
            </tr> */
}
