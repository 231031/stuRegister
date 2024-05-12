import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { getInfoStudent } from "../../helpers/comHelper";

export default function Committeestu() {
  
  const navigate = useNavigate();
  const location = useLocation();
  const [stu, setStu] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {

    if (location.state) setId(location.state.id);
    else navigate('/committee/tablestu');

    const apiStu = async () => {
      try {
        const res = await getInfoStudent(id);
        setStu(res);
      } catch (error) {
        console.error(error);
      }
    };
    if (id) apiStu();
  }, []);


  return (
    <HelmetProvider>
    <div>
      <Helmet>
          <title>C | Student</title>
      </Helmet>

    </div>
    </HelmetProvider>
  )
}


