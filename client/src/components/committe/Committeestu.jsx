import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { getInfoStudent } from "../../helpers/comHelper"
import Headercom from "./Headercom";

export default function Committeestu() {

  const navigate = useNavigate();
  const location = useLocation();
  const [info, setInfo] = useState("");
  const [gpax, setGpax] = useState("");
  const [id, setId] = useState("");
  const [scholar, setScholar] = useState("");

  useEffect(() => {
    if (location.state) {
      setId(location.state.student_id);
      setScholar(location.state.scholarship_id);
    }
    else navigate('/committee/tablestu');
  }, []);

  useEffect(() => {
    const apiStu = async () => {
      try {
        const res = await getInfoStudent(id);
        setInfo(res.info);
        setGpax(res.gpax);
      } catch (error) {
        console.error(error);
      }
    };
    if (id) apiStu();
  }, [id]);


  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <title>C | Student</title>
        </Helmet>
        <Headercom />
        <div className="flex flex-col items-center my-10">
          <div className="flex flex-col flex-wrap w-2/3 h-2/3 bg-Slate rounded-md shadow-md p-5">

            {/* header */}
            <div className="flex flex-row mt-5">
              <p className="font-bold mr-5">Applicant of Scholarship :</p>
              <p className="mr-8">{scholar}</p>
            </div>

            {/* personal */}
            <div className="flex flex-col my-5">
              <h3 className="my-2 font-extrabold">Personal</h3>
              {/* col 1 */}
              <div className="flex flex-row">
                <div className="flex flex-col mr-10">
                  <div className="flex flex-row">
                    <p className="font-bold mr-5">Student ID :</p>
                    <p>{info?.student_id}</p>
                  </div>
                  <div className="flex flex-row">
                    <p className="font-bold mr-5">Salary :</p>
                    <p>{info?.salary}</p>
                  </div>
                  <div className="flex flex-row">
                    <p className="font-bold mr-5">Gpax :</p>
                    <p>{gpax}</p>
                  </div>


                </div>



                {/* col 2 */}
                <div className="flex flex-col mr-10">
                  <div className="flex flex-row">
                    <p className="font-bold mr-5">First Name :</p>
                    <p>{info?.first_name}</p>
                  </div>
                  <div className="flex flex-row">
                    <p className="font-bold mr-5">Department :</p>
                    <p>{info?.department_name}</p>
                  </div>

                </div>
                {/* col 3 */}

                <div className="flex flex-col mr-10">
                  <div className="flex flex-row">
                    <p className="font-bold mr-5">Last Name :</p>
                    <p>{info?.last_name}</p>
                  </div>
                  <div className="flex flex-row">
                    <p className="font-bold mr-5">Faculty :</p>
                    <p>{info?.faculty_name}</p>
                  </div>
                </div>
              </div>
            </div>




            {/* family */}
            <div className="my-5">
              <h3 className="my-2 font-extrabold">Family</h3>
              <div className="flex flex-row">
                <p className="font-bold mr-5">Father Salary :</p>
                <p>{info?.f_salary}</p>
              </div>
              <div className="flex flex-row">
                <p className="font-bold mr-5">Mother Salary :</p>
                <p>{info?.m_salary}</p>
              </div>
            </div>

            {/* address */}
            <div className="my-5">
              <h3 className="my-2 font-extrabold">Present Address</h3>
              <div className="flex flex-row">
                <div className="flex flex-row mr-8">
                  <p className="font-bold mr-5">Address :</p>
                  <p>{info?.address}</p>
                </div>
                <div className="flex flex-row mr-8">
                  <p className="font-bold mr-5">City :</p>
                  <p>{info?.city}</p>
                </div>
                <div className="flex flex-row mr-8">
                  <p className="font-bold mr-5">State :</p>
                  <p>{info?.state}</p>
                </div>
                <div className="flex flex-row mr-8">
                  <p className="font-bold mr-5">Zip Code :</p>
                  <p>{info?.zip_code}</p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </HelmetProvider>
  )
}


