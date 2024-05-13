import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

import Headerstu from './Headerstu';
import profile from '../../assets/profile.png';
import { UpdateSchema } from '../../Validations/validation';

import { getInfo, registerInfomation } from '../../helpers/stuhelper';
  

export default function Studentregister() {

    const navigate = useNavigate();
    const [data, setData] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/student/login');
        }
        const [department_id, year, student_id] = token.split('-');
        const apiInfo = async () => {
            try {
                const res = await getInfo(student_id);
                setData(res);
            } catch (error) {
                console.log(error);
            }
        }
        if (student_id) apiInfo();

      }, []);

      const formik = useFormik({
        initialValues: {
            email: '' || data?.email,  
            phone: '' || data?.phone,
            city: '' || data?.city,
            state: '' || data?.state,
            zip_code: '' || data?.zip_code,
            address: '' || data?.address,

            f_salary: '' || data?.f_salary,
            f_email: '' || data?.f_email, 
            f_phone: '' || data?.f_phone, 

            m_salary: '' || data?.m_salary,
            m_email: '' || data?.m_email, 
            m_phone: '' || data?.m_phone, 

        },
        validationSchema: UpdateSchema,
        onSubmit: async (values) => {
            try {
                const res = await registerInfomation(values);
                toast.success(res.msg);
            } catch (error) {
                console.log(error);
                toast.error('You registered this scholarship');
            }
        },
        enableReinitialize: true,
      });


  return (
    <HelmetProvider>
    <div>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <Helmet>
            <title>Stu | register s</title>
        </Helmet> 
        <Headerstu data={data}/>

           

    <div className="container mx-auto my-5 p-5  ">
        <div className="md:flex no-wrap md:-mx-2 ">
            {/* <!-- Left Side --> */}
            <div className="w-full md:w-3/12 md:mx-2">
                {/* <!-- Profile Card --> */}
                <div className="bg-white p-3 border-t-4 border-sky">
                    <div className="image overflow-hidden">
                        <img className="h-auto w-full mx-auto"
                            src={profile}
                            alt=""/>
                    </div>
                    <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{data?.first_name} {data?.last_name}</h1>
                    <h3 className="text-gray-600 font-lg text-semibold leading-6">ID {data?.student_id}</h3>
                    <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">{data?.department_id}</p>
                    <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">Year {data?.year}</p>
                    <ul
                        className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                        <li className="flex items-center py-3">
                            <span>Status</span>
                            <span className="ml-auto"><span
                                    className="bg-green-500 py-1 px-2 rounded text-white text-sm">Study</span></span>
                        </li>
                        <li className="flex items-center py-3">
                            <span>Study since</span>
                            <span className="ml-auto">Nov 07, 2016</span>
                        </li>
                    </ul>
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
                            <span className="tracking-wide">Student Register</span>
                        </div>
                        <div className="text-gray-700">
                            {/* <--line1---> */}
                            <div className="grid md:grid-2 text-sm">
                                <div className="flex ">
                                    <div className="mt-2 w-200  px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                        First Name :
                                        </label>
                                        <p className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" style={{height:45, width:120}}>
                                            {data?.first_name}
                                        </p>
                                    </div>

                                    <div className="mt-2 w-200  px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                        Last Name :
                                        </label>
                                        <p className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" style={{height:45, width:120}}>
                                            {data?.last_name}
                                        </p>
                                    </div>

                                    <div className='mt-2 w-200  px-3 mb-6 md:mb-0' >
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-salary">
                                            Gender :
                                        </label>
                                        <p className="block appearance-none w-700 bg-white text-gray-700 border border-gray-200 rounded py-3  px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" style={{height:45, width:120}}>
                                            {data?.gender}
                                        </p>  

                                    </div>

                                    <div className="mt-2 w-200 px-3 mb-6 md:mb-0 ">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                        ID card :
                                        </label>
                                        <p className="block appearance-none w-700 bg-white text-gray-700 border border-gray-200 rounded py-3  px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" style={{height:45, width:120}}>
                                            {data?.id_card}
                                        </p>                 
                                    </div>



                                </div>
                            </div>
                            {/* <---ENDline1----> */}


                            {/* <---line2----> */}
                            <div className="grid md:grid-2 text-sm">
                                <div className="flex ">
                                    <div className="mt-5 w-200 px-3 mb-6 md:mb-0 ">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                        DOB :
                                        </label>
                                        <p className="block appearance-none w-700 bg-white text-gray-700 border border-gray-200 rounded py-3  px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" style={{height:45, width:120}}>
                                            {data?.dob ? new Date(data.dob).toISOString().split('T')[0] : ""}
                                        </p>                 
                                    </div>

                                    <div className="mt-5 w-100  px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                        Age :
                                        </label>
                                        <p className="appearance-none h-13  w-500 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" style={{height:45, width:120}}>
                                            {data?.age}
                                        </p>
                                   
                                    </div>
                                </div>
                            </div>
                            {/* <---ENDline2----> */}

                        </div>
                            


                        {/* <---line3---> */}
                        <div className="grid md:grid-2 text-sm">
                            <div className="flex">
                                <div className="mt-5 w-100  px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-address">
                                    Address :
                                    </label>
                                    <input
                                    name="address"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.address} 
                                    className="appearance-none h-13  w-500 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-address" type="text" style={{width:225 , height:50}}/>
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
                                className="appearance-none h-13  w-500 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" style={{width:225 , height:50}}/>
                                {formik.touched.city && formik.errors.city ? (
                                            <p className="text-red-500 text-xs italic">{formik.errors.city}</p>
                                        ) : null}
                                </div>

                                <div className="mt-5 w-100  px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                                    State :
                                    </label>
                                <input
                                name="state"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.state} 
                                className="appearance-none h-13  w-500 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" type="text" style={{width:225 , height:50}}/>
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
                                className="appearance-none h-13  w-500 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" style={{width:150 , height:50}}/>
                                {formik.touched.zip_code && formik.errors.zip_code ? (
                                            <p className="text-red-500 text-xs italic">{formik.errors.zip_code}</p>
                                        ) : null}
                                </div>
                            </div>
    
                        </div>
                        {/* <---ENDline3---> */}

                        {/* <---line4---> */}
                        <div className='grid md:grid-2 text-sm'>
                            <div  className="flex">
                                <div className="mt-5 w-100  px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                        Email :
                                        </label>
                                    <input 
                                    name="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    className="appearance-none h-13  w-500 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" style={{width:400 , height:50}}/>
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
                                    className="appearance-none h-13  w-500 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" style={{width:400 , height:50}}/>
                                    {formik.touched.phone && formik.errors.phone ? (
                                            <p className="text-red-500 text-xs italic">{formik.errors.phone}</p>
                                        ) : null}
                                </div>
                            </div>
                        </div>
                        {/* <----ENDline4---> */}


                    </div>

                    {/* <!-- space tab --> */}

                    <div className="my-4"></div>

                    {/* <!-- section2 --> */}
                    <div className="bg-sky p-3 shadow-sm rounded-sm">
                        <div className="flex items-center space-x-2 font-semibold text-white leading-8">
                            <span clas="text-green-500">
                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </span>
                            <span className="tracking-wide">Parent Register 1 (Father)</span>
                            
                        </div>

                        {/* <--line1---> */}
                        <div className=''>
                        
                            <div className="grid md:grid-2 text-sm">
                                <div className="flex ">
                                    <div className="mt-2 w-200  px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-city">
                                        First Name :
                                        </label>
                                        <p className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" style={{height:45, width:100}}>
                                            {data?.f_first_name}
                                        </p>
                                    </div>

                                    <div className="mt-2 w-200  px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-city">
                                        Last Name :
                                        </label>
                                    <p className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" style={{height:45, width:100}}>
                                        {data?.f_last_name}
                                    </p>
                                    </div>

                                    

                                    <div className="mt-2 w-200 px-3 mb-6 md:mb-0 ">
                                        <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-city">
                                        ID card :
                                        </label>
                                    <p className="block appearance-none w-700 bg-white text-gray-700 border border-gray-200 rounded py-3  px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" style={{height:45, width:100}}>
                                        {data?.f_id}
                                    </p>
                                    </div>

                                    <div className="mt-2 w-100  px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-city">
                                        Age :
                                        </label>
                                    <p className="appearance-none h-13  w-500 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" style={{width:100 }}>
                                        {data?.f_age}
                                    </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <---ENDline1----> */}

                        <div className="grid md:grid-2 text-sm">
                            <div  className="flex ">
                                <div className='mt-5 w-300  px-3 mb-6 md:mb-0' >
                                        <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-salary">
                                            Salary :
                                        </label>
                                        <div className="relative">
                                            <select 
                                            name="f_salary"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.f_salary}
                                            className="block appearance-none h-13 bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"style={{height:50 ,width : 300}} >
                                                <option value=''></option>
                                                <option value='10,000 - 25,000'>   10,000 - 25,000        Bath   </option>
                                                <option value='25,000 - 30,000'>   25,000 - 30,000        Bath   </option>
                                                <option value='30,000 - 50,000'>   30,000 - 50,000        Bath   </option>
                                                <option value='50,000 - 100,000'>   50,000 - 100,000        Bath   </option>

                                            
                                            </select>
                                            <div className=" pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-700">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                                </svg>
                                            </div>
                                            {formik.touched.f_salary && formik.errors.f_salary ? (
                                                    <p className="text-red-500 text-xs italic">{formik.errors.f_salary}</p>
                                                ) : null}
                                        </div>
                                </div>

                                <div className="mt-5 w-200 px-3 mb-6 md:mb-0 ">
                                        <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-city">
                                        Email :
                                        </label>
                                    <input 
                                    name="f_email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.f_email}
                                    className="block appearance-none w-700 bg-white text-gray-700 border border-gray-200 rounded py-3  px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" style={{height:50 ,width : 300}}/>
                                    {formik.touched.f_email && formik.errors.f_email ? (
                                            <p className="text-red-500 text-xs italic">{formik.errors.f_email}</p>
                                        ) : null}
                                </div>

                                <div className="mt-5 w-200 px-3 mb-6 md:mb-0 ">
                                        <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-city">
                                        Phone :
                                        </label>
                                    <input 
                                    name="f_phone"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.f_phone}
                                    className="block appearance-none w-700 bg-white text-gray-700 border border-gray-200 rounded py-3  px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" style={{height:50 ,width : 250}}/>
                                    {formik.touched.f_phone && formik.errors.f_phone ? (
                                            <p className="text-red-500 text-xs italic">{formik.errors.f_phone}</p>
                                        ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Endsection2 --> */}


                    <div className="my-4"></div>
                    

                    {/* <!-- section3 --> */}
                    <div className="bg-[#e4e4e7] p-3 shadow-sm rounded-sm">
                        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                            <span clas="text-green-500">
                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </span>
                            <span className="tracking-wide">Parent Register 2 (Mother)</span>
                            
                        </div>

                        {/* <--line1---> */}
                        <div className=''>
                        
                            <div className="grid md:grid-2 text-sm">
                                <div className="flex ">
                                    <div className="mt-2 w-200  px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                        First Name :
                                        </label>
                                    <p className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" style={{height:45, width:100}}>
                                        {data?.m_first_name}
                                    </p>
                                    </div>

                                    <div className="mt-2 w-200  px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                        Last Name :
                                        </label>
                                        <p className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" style={{height:45, width:100}}>
                                            {data?.m_last_name}
                                        </p>
                                    </div>

                                    

                                    <div className="mt-2 w-200 px-3 mb-6 md:mb-0 ">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                        ID card :
                                        </label>
                                    <p className="block appearance-none w-700 bg-white text-gray-700 border border-gray-200 rounded py-3  px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" style={{height:45, width:100}}>
                                        {data?.m_id}
                                    </p>
                                    </div>

                                    <div className="mt-2 w-100  px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                        Age :
                                        </label>
                                    <p className="appearance-none h-13  w-500 bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" style={{height:45, width:100}}>
                                        {data?.m_age}
                                    </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                            {/* <---ENDline1----> */}

                        <div className="grid md:grid-2 text-sm">
                            <div  className="flex " >
                                <div className='mt-5 w-300  px-3 mb-6 md:mb-0' >
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-salary" >
                                            Salary :
                                        </label>
                                        <div className="relative">
                                            <select 
                                            name="m_salary"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.m_salary}
                                            className="block appearance-none h-13 bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"style={{height:50 ,width : 300}} >
                                                <option value=''></option>
                                                <option value='10,000 - 25,000'>   10,000 - 25,000        Bath   </option>
                                                <option value='25,000 - 30,000'>   25,000 - 30,000        Bath   </option>
                                                <option value='30,000 - 50,000'>   30,000 - 50,000        Bath   </option>
                                                <option value='50,000 - 100,000'>   50,000 - 100,000        Bath   </option>

                                            
                                            </select>
                                            <div className=" pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-700">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                                </svg>
                                            </div>
                                            {formik.touched.m_salary && formik.errors.m_salary ? (
                                                <p className="text-red-500 text-xs italic">{formik.errors.m_salary}</p>
                                            ) : null}
                                        </div>
                                </div>

                                <div className="mt-5 w-200 px-3 mb-6 md:mb-0 ">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                        Email :
                                        </label>
                                    <input 
                                    name="m_email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.m_email}
                                    className="block appearance-none w-700 bg-white text-gray-700 border border-gray-200 rounded py-3  px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" style={{height:50 ,width : 300}}/>
                                    {formik.touched.m_email && formik.errors.m_email ? (
                                            <p className="text-red-500 text-xs italic">{formik.errors.m_email}</p>
                                        ) : null}
                                </div>

                                <div className="mt-5 w-200 px-3 mb-6 md:mb-0 " >
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                        Phone :
                                        </label>
                                    <input 
                                    name="m_phone"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.m_phone}
                                    className="block appearance-none w-700 bg-white text-gray-700 border border-gray-200 rounded py-3  px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" style={{height:50 ,width : 250}}/>
                                    {formik.touched.m_phone && formik.errors.m_phone ? (
                                            <p className="text-red-500 text-xs italic">{formik.errors.m_phone}</p>
                                        ) : null}
                                </div>
                            </div>
                        </div>

                        



                        
                        
                    </div>
                    {/* <!-- End of profile tab --> */}

                    {/* button */}
                    <div className='grid-container grid-gap-10'>
                        <div className='flex 'style={{ padding : 30 }} >
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