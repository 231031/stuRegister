import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import Headerteacher from "./Headerteacher";
import profile from '../../assets/profile.png';
import { TeacherPerSchema } from '../../Validations/validation';

import { getInfoTeacher, registerInfomation } from '../../helpers/teacherHelper';

export default function Teacherregister() {

    const navigate = useNavigate();
    const [data, setData] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/teacher/login');
        }
        const apiInfo = async () => {
            try {
                const res = await getInfoTeacher(localStorage.getItem("token"));
                setData(res);
            } catch (error) {
                console.log(error);
            }
        }
        apiInfo();

    }, []);

    const formik = useFormik({
        initialValues: {
            gender: '',
            id_card: '',
            age: '',
            date: '',
            month: '',
            year: '',
            email: '',
            phone: '',
            city: '',
            state: '',
            zip_code: '',
            address: '',
        },
        validationSchema: TeacherPerSchema,
        onSubmit: async (values) => {
            try {
                const res = await registerInfomation(values);
                toast.success(res.msg);
            } catch (error) {
                console.log(error);
            }
        },
    });


    return (
        <HelmetProvider>
            <div>
                <Toaster position='top-center' reverseOrder={false}></Toaster>
                <Helmet>
                    <title>T | register t</title>
                </Helmet>
                <Headerteacher data={data} />



                <div className="container mx-auto my-5 p-5  ">
                    <div className="md:flex no-wrap md:-mx-2 ">
                        {/* <!-- Left Side --> */}
                        <div className="w-full md:w-3/12 md:mx-2">
                            {/* <!-- Profile Card --> */}
                            <div className="bg-white p-3 border-t-4 border-sky">
                                <div className="image overflow-hidden">
                                    <img className="h-auto w-full mx-auto"
                                        src={profile}
                                        alt="" />
                                </div>
                                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{data?.first_name} {data?.last_name}</h1>
                                <h3 className="text-gray-600 font-lg text-semibold leading-6">ID {data?.teacher_id}</h3>
                                <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">{data?.department_id}</p>
                                <p className="text-sm text-gray-500 hover:text-gray-600 leading-6 md-3">POS. {data?.position}</p>

                            </div>
                            {/* <!-- End of profile card --> */}
                            <div className="my-4"></div>
                        </div>
                        {/* <!-- Right Side --> */}
                        <form onSubmit={formik.handleSubmit} className='w-full md:w-9/12 mx-2 h-64'>
                            <div>
                                {/* <!-- Profile tab -->
                    <!-- About Section --> */}
                                <div className="bg-[#e4e4e7] p-3 shadow-sm rounded-sm">
                                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                        <span clas="text-green-500">
                                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </span>
                                        <span className="tracking-wide">Teacher Register</span>
                                    </div>
                                    <div className="text-gray-700">
                                        {/* <--line1---> */}
                                        <div className="grid md:grid-2 text-sm">
                                            <div className="flex ">
                                                <div className="mt-2 w-200  px-3 mb-6 md:mb-0">
                                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                                        First Name :
                                                    </label>
                                                    <p className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" >
                                                        {data?.first_name}
                                                    </p>
                                                </div>

                                                <div className="mt-2 w-200  px-3 mb-6 md:mb-0">
                                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                                        Last Name :
                                                    </label>
                                                    <p className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" >
                                                        {data?.last_name}
                                                    </p>
                                                </div>

                                                <div className='mt-2 w-200  px-3 mb-6 md:mb-0' >
                                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-salary">
                                                        Gender :
                                                    </label>
                                                    <div className="relative">
                                                        <select
                                                            name="gender"
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.gender}
                                                            className="block appearance-none h-13 w-500 bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                                            <option value=''></option>
                                                            <option value='Male'>  Male   </option>
                                                            <option value='Female'>  Female </option>

                                                        </select>
                                                        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center  text-gray-700">
                                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                                        </div>
                                                    </div>
                                                    {formik.touched.gender && formik.errors.gender ? (
                                                        <p className="text-red-500 text-xs italic">{formik.errors.gender}</p>
                                                    ) : null}

                                                </div>

                                                <div className="mt-2 w-200 px-3 mb-6 md:mb-0 ">
                                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                                        ID card :
                                                    </label>
                                                    <input
                                                        name="id_card"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.id_card}
                                                        className="block appearance-none w-700 bg-white text-gray-700 border border-gray-200 rounded py-3  px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" />
                                                    {formik.touched.id_card && formik.errors.id_card ? (
                                                        <p className="text-red-500 text-xs italic">{formik.errors.id_card}</p>
                                                    ) : null}
                                                </div>



                                            </div>
                                        </div>
                                        {/* <---ENDline1----> */}

                                        {/* <---line2----> */}
                                        <div className="grid md:grid-2 text-sm">
                                            <div className="flex ">
                                                <div className='mt-5 w-300  px-3 mb-6 md:mb-0' >
                                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-salary">
                                                        Day of Birth :
                                                    </label>
                                                    <div className="relative">
                                                        <select
                                                            name="month"
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.month}
                                                            className="block appearance-none h-13 bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" style={{ height: 50, width: 200 }} >
                                                            <option value=''></option>
                                                            <option value='01'>  January  </option>
                                                            <option value='02'>  February </option>
                                                            <option value='03'>  March </option>
                                                            <option value='04'>  April  </option>
                                                            <option value='05'>  May </option>
                                                            <option value='06'>  June </option>
                                                            <option value='07'>  July  </option>
                                                            <option value='08'>  August </option>
                                                            <option value='09'>  September </option>
                                                            <option value='10'>  October </option>
                                                            <option value='11'>  November </option>
                                                            <option value='12'>  December </option>
                                                        </select>
                                                        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center  text-gray-700">
                                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                                        </div>
                                                    </div>
                                                    {formik.touched.month && formik.errors.month ? (
                                                        <p className="text-red-500 text-xs italic">{formik.errors.month}</p>
                                                    ) : null}
                                                </div>

                                                <div className='mt-5 w-200  px-3 mb-6 md:mb-0' >
                                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-salary">
                                                        D
                                                    </label>
                                                    <div className="relative">
                                                        <select
                                                            name="date"
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.date}
                                                            className="appearance-none h-13 w-500 bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" style={{ height: 50, width: 200 }} >
                                                            <option value=''></option>
                                                            <option value='01'>  1  </option>
                                                            <option value='02'>   2 </option>
                                                            <option value='03'>   3 </option>
                                                            <option value='04'>   4 </option>
                                                            <option value='05'>   5 </option>
                                                            <option value='06'>   6 </option>
                                                            <option value='07'>   7 </option>
                                                            <option value='08'>   8 </option>
                                                            <option value='09'>   9 </option>
                                                            <option value='10'>   10 </option>
                                                            <option value='11'>   11 </option>
                                                            <option value='12'>  12  </option>
                                                            <option value='13'>   13 </option>
                                                            <option value='14'>   14 </option>
                                                            <option value='15'>   15 </option>
                                                            <option value='16'>   16 </option>
                                                            <option value='17'>   17 </option>
                                                            <option value='18'>   18 </option>
                                                            <option value='19'>   19 </option>
                                                            <option value='20'>   20 </option>
                                                            <option value='21'>   21 </option>
                                                            <option value='22'>   22 </option>
                                                            <option value='23'>  23  </option>
                                                            <option value='24'>   24 </option>
                                                            <option value='25'>   25 </option>
                                                            <option value='26'>   26</option>
                                                            <option value='27'>   27 </option>
                                                            <option value='28'>   28 </option>
                                                            <option value='29'>   29 </option>
                                                            <option value='30'>   30 </option>
                                                            <option value='31'>   31 </option>
                                                        </select>
                                                        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center  text-gray-700">
                                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                                        </div>
                                                    </div>
                                                    {formik.touched.date && formik.errors.date ? (
                                                        <p className="text-red-500 text-xs italic">{formik.errors.date}</p>
                                                    ) : null}
                                                </div>

                                                <div className="mt-5 w-100  px-3 mb-6 md:mb-0">
                                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                                        Y :
                                                    </label>
                                                    <input
                                                        name="year"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.year}
                                                        className="appearance-none h-13  w-500 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" style={{ width: 100, height: 50 }} />
                                                    {formik.touched.year && formik.errors.year ? (
                                                        <p className="text-red-500 text-xs italic">{formik.errors.year}</p>
                                                    ) : null}
                                                </div>

                                                <div className="mt-5 w-100  px-3 mb-6 md:mb-0">
                                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                                        Age :
                                                    </label>
                                                    <input
                                                        name="age"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.age}
                                                        className="appearance-none h-13  w-500 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" style={{ width: 100, height: 50 }} />
                                                    {formik.touched.age && formik.errors.age ? (
                                                        <p className="text-red-500 text-xs italic">{formik.errors.age}</p>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                        {/* <---ENDline2----> */}
                                    </div>



                                    {/* <---line3---> */}
                                    <div className="grid md:grid-2 text-sm">
                                        <div className="flex">
                                            <div className="mt-5 w-100  px-3 mb-6 md:mb-0">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                                    Address :
                                                </label>
                                                <input
                                                    name="address"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.address}
                                                    className="appearance-none h-13  w-500 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" style={{ width: 225, height: 50 }} />
                                                {formik.touched.address && formik.errors.address ? (
                                                    <p className="text-red-500 text-xs italic">{formik.errors.address}</p>
                                                ) : null}
                                            </div>

                                            <div className="mt-5 w-100  px-3 mb-6 md:mb-0">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                                    City :
                                                </label>
                                                <input
                                                    name="city"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.city}
                                                    className="appearance-none h-13  w-500 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" style={{ width: 225, height: 50 }} />
                                                {formik.touched.city && formik.errors.city ? (
                                                    <p className="text-red-500 text-xs italic">{formik.errors.city}</p>
                                                ) : null}
                                            </div>

                                            <div className="mt-5 w-100  px-3 mb-6 md:mb-0">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                                    State :
                                                </label>
                                                <input
                                                    name="state"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.state}
                                                    className="appearance-none h-13  w-500 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" style={{ width: 225, height: 50 }} />
                                                {formik.touched.state && formik.errors.state ? (
                                                    <p className="text-red-500 text-xs italic">{formik.errors.state}</p>
                                                ) : null}
                                            </div>

                                            <div className="mt-5 w-100  px-3 mb-6 md:mb-0">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                                    Zip code :
                                                </label>
                                                <input
                                                    name="zip_code"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.zip_code}
                                                    className="appearance-none h-13  w-500 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" style={{ width: 150, height: 50 }} />
                                                {formik.touched.zip_code && formik.errors.zip_code ? (
                                                    <p className="text-red-500 text-xs italic">{formik.errors.zip_code}</p>
                                                ) : null}
                                            </div>
                                        </div>

                                    </div>
                                    {/* <---ENDline3---> */}

                                    {/* <---line4---> */}
                                    <div className='grid md:grid-2 text-sm'>
                                        <div className="flex">
                                            <div className="mt-5 w-100  px-3 mb-6 md:mb-0">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                                    Email :
                                                </label>
                                                <input
                                                    name="email"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.email}
                                                    className="appearance-none h-13  w-500 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" style={{ width: 400, height: 50 }} />
                                                {formik.touched.email && formik.errors.email ? (
                                                    <p className="text-red-500 text-xs italic">{formik.errors.email}</p>
                                                ) : null}
                                            </div>
                                            <div className="mt-5 w-100  px-3 mb-6 md:mb-0">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                                    Phone :
                                                </label>
                                                <input
                                                    name="phone"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.phone}
                                                    className="appearance-none h-13  w-500 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" style={{ width: 400, height: 50 }} />
                                                {formik.touched.phone && formik.errors.phone ? (
                                                    <p className="text-red-500 text-xs italic">{formik.errors.phone}</p>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <----ENDline4---> */}


                                {/* button */}
                                <div className='grid-container grid-gap-10'>
                                    <div className='flex ' style={{ padding: 30 }} >
                                        <div className='grid-item ' ></div>
                                        <button type='submit'
                                            className="bg-sky hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 border border-sky hover:border-transparent rounded mr-1">
                                            Submit
                                        </button>
                                    </div>
                                </div>





                            </div>
                        </form>
                    </div>
                </div>









            </div>
        </HelmetProvider>
    )
}