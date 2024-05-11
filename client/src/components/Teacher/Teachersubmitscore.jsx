import React, { useEffect, useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

import Headerteacher from "./Headerteacher";

import { getInfoTeacher, getStuTeacher, updateGrade } from "../../helpers/teacherHelper";

export default function Teacherscore() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState("");
  const [id, setId] = useState("");
  const [student, setStudent] = useState("");
  const [sel, setSel] = useState([]);
  const [term, setTerm] = useState(2); // current term

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/teacher/login");
    }

    if (location.state) setId(location.state.course_id);
    else navigate("teacher/selcourses");

    const month = new Date().getMonth()
    if (month >= 7) setTerm(1); // month 7 is August 1

    const apiInfo = async () => {
      try {
        const res = await getInfoTeacher(localStorage.getItem("token"));
        setData(res);
      } catch (error) {
        toast.error("Cannot Get Information");
        console.error(error);
      }
    };
    apiInfo();
  }, []);

  useEffect(() => {
    const apiStu = async () => {
      try {
        const res = await getStuTeacher(data.teacher_id, id);
        setStudent(res);
      } catch (error) {
        toast.error("Cannot Get Information");
        console.error(error);
      }
    };
    if (data && id) apiStu();
  }, [data, id]);

  function handleChange(grade, id, index, course_id, credit, year) {
    if (grade != '') {
      setSel((prevSel) => {
        const updatedSel = [...prevSel];
        if (updatedSel[index] === undefined) {
          updatedSel.push({
            student_id: id,
            grade: grade,
            course_id: course_id,
            credit: credit,
            year: year,
          });
        } else {
          updatedSel[index] = {
            student_id: id,
            grade: grade,
            course_id: course_id,
            credit: credit,
            year: year,
          };
        }
        return updatedSel;
      });
    }
    
  }

  async function handleClick() {
    try {
      if (sel.length === student.length) {
        const res = await updateGrade(sel, term);
        toast.success(res.msg);
      } else {
        toast.error('Please Fill All Grade');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <HelmetProvider>
        <Helmet>
          <title>T | SubmitScore</title>
        </Helmet>
      </HelmetProvider>
      <Headerteacher data={data} />

      {/* <----textheader----> */}
      <div className="container px-2 py-24 mx-auto">
        <div id="feedbackModal" className="feedbackModal">
          <div className="modalContent">
            <h1 className="text-center text-3xl font-semibold capitalize text-sky dark:text-sky lg:text-4xl">
              Submit score
            </h1>
            <h2 style={{ textAlign: "center", marginTop: "0px" }}>
              KMUTT UNIVERSITY
            </h2>

            <div className="container mt-3">
              <h1 className="text-center  text-gray-600 text-2xl  ">
                {student[0]?.course_id}: {student[0]?.course_name}
              </h1>
              <br />
            </div>
          </div>
        </div>

        {/* <----table------> */}

        <div className="grid-cols-2">
          <div className=" pt-10 overflow-x-auto sm:mx-0.5 lg:mx-0.5">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              {student.length > 0 ? (
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-gray-200 border-b">
                      <tr>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Student ID
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Student Name
                        </th>

                        <div className="flex flex-row-reverse mr-10 pt-1">
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            Grade
                          </th>
                        </div>
                      </tr>
                    </thead>
                    <tbody>
                      {student.map((stuList, index) => (
                        <tr key={index} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 ">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {stuList.student_id}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {stuList.first_name} {stuList.last_name}
                          </td>
                          <div className="flex flex-row-reverse mr-10 pt-1">
                            <div className="w-100px px-3 ">
                              <div className="relative">
                                <select
                                  onChange={(e)=>handleChange(e.target.value, stuList.student_id, index, stuList.course_id, stuList.credit, stuList.year)}
                                  className="block appearance-none w-100px bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-200"
                                  id="grid-state"
                                >
                                  <option value=''></option>
                                  <option value={4}> A </option>
                                  <option value={3}> B </option>
                                  <option value={2}> C </option>
                                  <option value={1}> D </option>
                                  <option value={0}> F </option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                  <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <button
                    onClick={(e)=>handleClick()}
                    className="mt-5 bg-sky hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 border border-sky hover:border-transparent rounded mr-1 "
                    style={{
                      position: "relative",
                      left: "50%",
                      transform: "translate(-50%, 0%)",
                    }}
                  >
                      Submit
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <p className="text-red-500 font-bold">All Student have already been graded</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">6507050002</td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              Somchai Wongsawat
              </td>
              
              
              <div class ='flex flex-row-reverse mr-10 pt-1'>
                <div className="w-100px px-3 ">
                    <div className="relative">
                        <select className="block appearance-none w-100px bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-200" id="grid-state">
                        <option > A </option>
                        <option > B </option>
                        <option > C </option>
                        <option > D </option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>

              </div>
              
            </tr> */
}
