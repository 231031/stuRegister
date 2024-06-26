import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { Helmet, HelmetProvider } from "react-helmet-async";


import Headercom from "./Headercom";
import { getAllScholarships } from "../../helpers/helper";
import { getApplicant, getCountFaculty } from "../../helpers/comHelper";

const Row = tw.td`border border-slate-600 py-1 px-2 text-sm`;
export default function Committeetable() {

  const [data, setData] = useState("");
  const [stu, setStu] = useState("");
  const [sel, setSel] = useState("");
  const [count_fac, setCount] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const apiScholar = async () => {
      try {
        const res = await getAllScholarships();
        setData(res);
      } catch (error) {
        console.error(error);
      }
    };
    apiScholar();
  }, []);

  useEffect(() => {
    const apiStu = async () => {
      try {
        const res = await getApplicant(sel);
        setStu(res);
      } catch (error) {
        console.error(error);
      }
    };

    const apiCount = async () => {
      try {
        const res = await getCountFaculty(sel);
        setCount(res);
      } catch (error) {
        console.error(error);
      }
    };

    if (sel) {
      apiCount();
      apiStu();
    }

  }, [sel]);

  function handleClick(id) {
    navigate('/committee/info', { state: { student_id: id, scholarship_id: sel } });
  }


  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <title>C | Application</title>
        </Helmet>
        <Headercom />

        <div className='flex flex-col items-center'>
          {
            (data.length > 0) ? (
              <div className='flex flex-col w-2/6 mt-5'>
                <label htmlFor='sel' className="text-center">Select Scholarship</label>
                <select
                  className='border-2 border-lowbrown rounded-md w-full mt-2 text-center' id='sel'
                  onChange={(e) => setSel(e.target.value)}>
                  <option value=''></option>
                  {
                    data.map((deList, index) => (
                      <option key={index} value={deList.scholarship_id}>{deList.scholarship_id} {deList.scholarship_name}</option>
                    ))
                  }
                </select>
              </div>

            ) : (
              <p className='my-5'>No Scholarship for Choose Right Now</p>
            )
          }



          {

            (stu.length) > 0 ? (
              <div className='mt-10 flex flex-col items-center'>
                <h3 className="font-bold">Applicant : Year {stu[0]?.get_year}</h3>
                <table className='my-2 table-fixed border-collapse border border-lowbrown-500 text-center w-3/4'>
                  <thead>
                    <tr>
                      <Row>Num</Row>
                      <Row>Student Name</Row>
                      <Row>Department</Row>
                      <Row>Faculty</Row>
                      <Row>Status</Row>
                      <Row>Information</Row>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      stu.map((stuList, index) => (
                        <tr key={index}>
                          <Row>{index + 1}</Row>
                          <Row>{stuList.first_name} {stuList.last_name}</Row>
                          <Row>{stuList.department_name}</Row>
                          <Row>{stuList.faculty_name}</Row>
                          <Row>
                            {
                              (stuList.status == 1) ? (
                                <p>Evaluated</p>
                              ) : (
                                <p>Not Evaluated</p>
                              )
                            }
                          </Row>
                          <Row className='cursor-pointer hover:bg-sky'>
                            <button className='text-lowbrown ' onClick={(e) => handleClick(stuList.student_id)}>Click</button>
                          </Row>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            ) : (
              <div className='mt-20 h-72 font-bold'>
                <h3 className='ml-7 text-xl text-darkbrown'>Applicant</h3>
                <h2 className='my-4 ml-7 text-md text-darkbrown flex justify-center'>Choose Scholarship</h2>
              </div>
            )
          }


          {/* table from advanced analysis */}
          {
            (count_fac.length) > 0 ? (
              <div className='mt-10 flex flex-col items-center'>
                <h3 className="font-bold">The number of students who got {sel} in each faculty</h3>
                <table className='my-2 table-fixed border-collapse border border-lowbrown-500 text-center w-3/4'>
                  <thead>
                    <tr>
                      <Row>Num</Row>
                      <Row>Faculty Name</Row>
                      <Row>Number Approved</Row>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      count_fac.map((cList, index) => (
                        <tr key={index}>
                          <Row>{index + 1}</Row>
                          <Row>{cList.faculty_name}</Row>
                          <Row>{cList.count_student}</Row>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            ) : (
              <div className='mt-15 h-72 font-bold'>
                <h3 className='ml-7 text-xl text-darkbrown'>Scholarship in each faculty</h3>
                <h2 className='my-4 ml-7 text-md text-darkbrown flex justify-center'>Choose Scholarship</h2>
              </div>
            )
          }

        </div>

      </div>
    </HelmetProvider>
  );
}
