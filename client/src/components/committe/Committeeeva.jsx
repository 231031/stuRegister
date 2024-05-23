import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { Helmet, HelmetProvider } from "react-helmet-async";
import toast, { Toaster } from "react-hot-toast";

import Headercom from "./Headercom";
import { getAllScholarships } from "../../helpers/helper";
import { getScholarHis, updateCheck } from "../../helpers/comHelper";

const Row = tw.td`border border-slate-600 py-1 px-2 text-sm`;
export default function Committeeeva() {

  const [data, setData] = useState("");
  const [stu, setStu] = useState("");
  const [sel, setSel] = useState("");
  const [eva, setEva] = useState([]);
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
        const res = await getScholarHis(sel);
        setStu(res);
      } catch (error) {
        console.error(error);
      }
    };
    if (sel) apiStu();
  }, [sel]);

  function handleChange(index, id, approve, year) {
    if (approve != '') {
      setEva((prevSel) => {
        const updatedSel = [...prevSel];
        if (updatedSel[index] === undefined) {
          updatedSel.push({
            student_id: id,
            approve: approve,
            get_year: year,
          });
        } else {
          updatedSel[index] = {
            student_id: id,
            approve: approve,
            get_year: year,
          };
        }
        return updatedSel;
      });
    }
  }

  async function handleUpdate() {
    try {
      if (stu.length === eva.length) {
        const res = await updateCheck(eva, stu[0].scholarship_id);
        toast.success(res.msg);
      } else {
        toast.error('Please select All Approved');
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <HelmetProvider>
      <div>
        <Toaster position="top-center" reverseOrder={false}></Toaster>

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
              <p className='my-5 font-bold text-darkbrown'>No Scholarship for Choose Right Now</p>
            )
          }
          <div className='mt-10'></div>
          {
            (stu.length) > 0 ? (
              <div className='flex flex-col items-center'>
                <table className='my-2 table-fixed border-collapse border border-lowbrown text-center'>
                  <thead>
                    <tr>
                      <Row>Num</Row>
                      <Row>Student Name</Row>
                      <Row>Department</Row>
                      <Row>Faculty</Row>
                      <Row>Evaluate</Row>
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
                            <select onChange={(e) => handleChange(index, stuList.student_id, e.target.value, stuList.get_year)}>
                              <option value=''></option>
                              <option value={true} className="text-greendark">pass</option>
                              <option value={false} className="text-red-500">reject</option>
                            </select>
                          </Row>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
                <button onClick={(e) => handleUpdate()} type="button"
                  className="px-3 py-1 bg-sky rounded-md my-10">SUBMIT</button>
              </div>
            ) : (
              <div className='my-5 h-72'>
                <h3 className='ml-7 text-xl text-darkbrown font-bold'>Evaluation</h3>
                <h2 className='my-4 ml-7 text-md text-lowbrown flex justify-center font-bold'>Choose Scholarship</h2>
              </div>
            )
          }

        </div>

      </div>
    </HelmetProvider>
  );
}

