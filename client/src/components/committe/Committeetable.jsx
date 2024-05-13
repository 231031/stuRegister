import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { Helmet, HelmetProvider } from "react-helmet-async";


import Headercom from "./Headercom";
import { getAllScholarships } from "../../helpers/helper";
import { getApplicant } from "../../helpers/comHelper";

const Row = tw.td`border border-slate-600 py-1 px-2 text-sm`;
export default function Committeetable() {

  const [data, setData] = useState("");
  const [stu, setStu] = useState("");
  const [sel, setSel] = useState("");
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
    if (sel) apiStu();
  }, [sel]);

  function handleClick(id) {
    navigate('/committee/info', { state: { student_id: id, scholarship_id : sel  }});
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
                  className='border-2 border-sky rounded-md w-full mt-2 text-center' id='sel'
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
          <div className='mt-10'>
            {
              (stu.length) > 0 ? (
                <table className='my-2 table-fixed border-collapse border border-slate-500 text-center'>
                  <thead>
                    <tr>
                      <Row>Num</Row>
                      <Row>Student Name</Row>
                      <Row>Information</Row>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      stu.map((stuList, index) => (
                        <tr key={index}>
                          <Row>{index + 1}</Row>
                          <Row>{stuList.first_name} {stuList.last_name}</Row>
                          <Row className='cursor-pointer hover:bg-blue-300'>
                            <button className='text-green-600 ' onClick={(e) => handleClick(stuList.student_id)}>Click</button>
                          </Row>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              ) : (
                <div className='my-5 h-72'>
                  <h3 className='ml-7 text-xl text-blue-900'>Applicant</h3>
                  <h2 className='my-4 ml-7 text-md text-blue-600 flex justify-center'>Choose Scholarship</h2>
                </div>
              )
            }
          </div>
        </div>

      </div>
    </HelmetProvider>
  );
}
