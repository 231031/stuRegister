import React, { useEffect, useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from "formik";

import { updateInfoStu, getInfoStudent } from "../../helpers/adminHelper";
import Headeradmin from "./Headeradmin";

export default function Adminupdatestu() {

  const location = useLocation();
  const navigate = useNavigate();
  const [stu, setStu] = useState("");

  useEffect(() => {
    const apiStu = async () => {
      try {
        const res = await getInfoStudent(location.state.student_id);
        setStu(res);
      } catch (error) {
        console.error(error);
      }
    };

    if (location.state) {
      apiStu();
    }
    else navigate("/admin/selstudent");
  }, []);

  const formik = useFormik({
    initialValues: {
      first_name: stu?.first_name || '',
      last_name: stu?.last_name || '',
      id_card: stu?.id_card || '',
      dob: stu?.dob || '',
      age: stu?.age || '',
    },
    // validationSchema: AdminCourseSchema,
    onSubmit: async (values) => {
      try {
        const res = await updateInfoStu(values, location.state.student_id);
        toast.success(res.msg);
      } catch (error) {
        console.log(error);
      }
    },
    enableReinitialize: true,
  });

  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <title>A | EditCourse</title>
        </Helmet>
        <Headeradmin />

        <Toaster position='top-center' reverseOrder={false}></Toaster>

        <div className="bg-indigo-200 h-[calc(100vh-40px)] ">
          <h3 className='text-center py-4 font-bold'>Update Student</h3>
          <div className="flex flex-col items-center">
            <form className='w-1/2' onSubmit={formik.handleSubmit}>
              <div className='flex flex-col items-around'>
                <div className='flex flex-row'>
                  <div className="relative w-1/2 mb-3">
                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                      First Name
                    </label>
                    <input
                      name="first_name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.first_name}
                      type="first_name"
                      id="first_name"
                      className="border-0 px-3 py-3 rounded text-sm shadow w-fullbg-gray-300 placeholder-black text-gray-800 outline-none focus:bg-gray-400"
                    />
                    {formik.touched.first_name && formik.errors.first_name ? (
                      <p className="text-red-500 text-xs italic">{formik.errors.first_name}</p>
                    ) : null}
                  </div>

                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                      Last Name
                    </label>
                    <input
                      name="last_name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.last_name}
                      type="last_name"
                      id="last_name"
                      className="border-0 px-3 py-3 rounded text-sm shadow w-fullbg-gray-300 placeholder-black text-gray-800 outline-none focus:bg-gray-400"
                    />
                    {formik.touched.last_name && formik.errors.last_name ? (
                      <p className="text-red-500 text-xs italic">{formik.errors.last_name}</p>
                    ) : null}
                  </div>
                </div>
                

                <div className='flex flex-row'>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                    ID Card
                  </label>
                  <input
                    name="id_card"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.id_card}
                    type="id_card"
                    id="id_card"
                    className="border-0 px-3 py-3 rounded text-sm shadow w-fullbg-gray-300 placeholder-black text-gray-800 outline-none focus:bg-gray-400"
                    required
                  />
                  {formik.touched.id_card && formik.errors.id_card ? (
                    <p className="text-red-500 text-xs italic">{formik.errors.id_card}</p>
                  ) : null}
                </div>
                
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                      Day of Birth
                    </label>
                    <input
                      name="dob"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.dob}
                      type="dob"
                      id="dob"
                      className="border-0 px-3 py-3 rounded text-sm shadow w-fullbg-gray-300 placeholder-black text-gray-800 outline-none focus:bg-gray-400"
                    />
                    {formik.touched.dob && formik.errors.dob ? (
                      <p className="text-red-500 text-xs italic">{formik.errors.dob}</p>
                    ) : null}
                  </div>

                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                      Age
                    </label>
                    <input
                      name="age"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.age}
                      type="age"
                      id="age"
                      className="border-0 px-3 py-3 rounded text-sm shadow w-fullbg-gray-300 placeholder-black text-gray-800 outline-none focus:bg-gray-400"
                    />
                    {formik.touched.age && formik.errors.age ? (
                      <p className="text-red-500 text-xs italic">{formik.errors.age}</p>
                    ) : null}
                  </div>
                </div>


                <div className="text-center mt-6">
                  <button
                    className="bg-sky text-white text-center mx-auto active:bg-gray-400 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </HelmetProvider>
  )
}
