import React, { useEffect, useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from "formik";

import { getCourse } from '../../helpers/helper';
import { editCourse } from '../../helpers/adminHelper';
import { AdminCourseSchema } from '../../Validations/validation';
import Headeradmin from "./Headeradmin";

export default function Courseedit() {

    const location = useLocation();
    const navigate = useNavigate();
    const [course, setCourse] = useState("");

    useEffect(() => {
        const apiCourse = async () => {
            try {
                const res = await getCourse(location.state.course_id);
                setCourse(res);
            } catch (error) {
                console.error(error);
            }
        };

        if (location.state) {
            apiCourse();
        }
        else navigate("/admin/selcourse");
    }, []);

    const formik = useFormik({
        initialValues: {
            course_name: course?.course_name || '',
            description: course?.description || '',
            credit: course?.credit || '',
            course_id: course?.course_id || '',
        },
        validationSchema: AdminCourseSchema,
        onSubmit: async (values) => {
            try {
                const res = await editCourse(values);
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

                <div className="bg-indigo-200 h-[calc(100vh-40px)]">
                    <h3 className='text-center py-4'>Update Course</h3>
                    <div className="flex flex-col items-center">
                        <form className='w-3/4' onSubmit={formik.handleSubmit}>
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
                                />
                                {formik.touched.course_name && formik.errors.course_name ? (
                                    <p className="text-red-500 text-xs italic">{formik.errors.course_name}</p>
                                ) : null}
                            </div>

                            <div className="relative w-full mb-3">
                                <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                                    Credit
                                </label>
                                <input
                                    name="credit"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.credit}
                                    type="credit"
                                    id="credit"
                                    className="border-0 px-3 py-3 rounded text-sm shadow w-fullbg-gray-300 placeholder-black text-gray-800 outline-none focus:bg-gray-400"
                                />
                                {formik.touched.credit && formik.errors.credit ? (
                                    <p className="text-red-500 text-xs italic">{formik.errors.credit}</p>
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
                                    maxLength="300"
                                    id="feedback"
                                    rows="4"
                                    cols="80"
                                    className="border-0 px-3 py-3  placeholder-black text-gray-800 rounded text-sm shadow focus:outline-none w-full"
                                ></textarea>
                                {formik.touched.description && formik.errors.description ? (
                                    <p className="text-red-500 text-xs italic">{formik.errors.description}</p>
                                ) : null}
                            </div>
                            <div className="text-center mt-6">
                                <button
                                    id="feedbackBtn"
                                    className="bg-sky text-white text-center mx-auto active:bg-gray-400 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    )
}
