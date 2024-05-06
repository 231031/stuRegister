import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import Headerstu from './Headerstu';
import { getScholar, getInfo, registerScholar } from '../../helpers/stuhelper';
import { UpdateSchema } from '../../Validations/validation';

export default function Scholarform() {

    const navigate = useNavigate();
    const [data, setData] = useState('');
    const [scholar, setScholar] = useState('');

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

        const apiScholar = async () => {
          try {
            const res = await getScholar();
            setScholar(res);
          } catch (error) {
            console.log(error);
          };
        }
        apiScholar();
    }, []);

    // username 65CPE001 Password 123456789
    const formik = useFormik({
      initialValues: {
          email: data?.email || '',  
          phone: data?.phone || '',
          salary: data?.salary || '',
          city: data?.city || '',
          state: data?.state || '',
          zipCode: data?.zipCode || '',
          address: data?.address || '',
          // scholarship_id: '',
      },
      validationSchema: UpdateSchema,
      onSubmit: async (values) => {
          try {
              const res = await registerScholar(data, values);
              // console.log(values);
          } catch (error) {
              console.log(error);
          }
      },
      enableReinitialize: true,
    });


  return (
    <HelmetProvider>
      
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <Helmet>
          <title>Stu | Scholarform</title>
      </Helmet> 
      <Headerstu data={data}/>


      <form onSubmit={formik.handleSubmit}>
        {/* <-----section1-----> */}
        <div className="mt-10 md:container md:mx-auto">
        <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2" htmlFor="Agent Register">
        Agent Register
         </label>
        {/* <div lassName="w-full max-w-lg"> */}
          <div className="flex flex-wrap mt-10 -mx-3 mb-6">
            <div className="w-300px  px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                First Name
              </label>
              <p className="appearance-none block w-200 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-9 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name">{data?.firstName}</p>
            </div>
            
            <div className="w-300px  px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                last Name
              </label>
              <p className="appearance-none block w-200 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-9 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-last-name">{data?.lastName}</p>
            </div>

            <div className="w-200px px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-gender">
                Gender
              </label>
              <p className="appearance-none block w-200px bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-gender">{data?.gender}</p>
              {/* <div className="relative"> */}
                {/* <select className="block appearance-none w-400px bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" value={data?.gender}>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
                  <option value={data?.gender}>{data?.gender}</option>
                </select> */}
              {/* </div> */}
            </div>

            <div className="w-300px px-3 ">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-salary">
                Salary
              </label>
              <div className="relative">
                <select 
                name="salary"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.salary}
                className="block appearance-none w-600px bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                  <option value={data?.salary}>{data?.salary}</option>
                  <option value='10,000 - 25,000'>   10,000 - 25,000        Bath   </option>
                  <option value='25,000 - 30,000'>   25,000 - 30,000        Bath   </option>
                  <option value='30,000 - 50,000'>   30,000 - 50,000        Bath   </option>
                  <option value='50,000 - 100,000'>   50,000 - 100,000        Bath   </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
          </div>


          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-400px px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                Email id
              </label>
              <input 
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder={data?.email}/>
              {formik.touched.email && formik.errors.email ? (
                            <p className="text-red-500 text-xs italic">{formik.errors.email}</p>
                        ) : null}
            </div>

            <div className="w-300px  px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                Mobile No:
              </label>
              <input 
              name="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="tel" placeholder={data?.phone}/>
              {formik.touched.phone && formik.errors.phone ? (
                            <p className="text-red-500 text-xs italic">{formik.errors.phone}</p>
                        ) : null}
            </div>

            

            <div className=" w-300px px-3 ">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-dayofbirth">
                Day of birth
              </label>
              <p className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"   id="grid-dayofbirth">{data?.dob}</p>
                {/* <div className="relative">
                  <select className="block appearance-none w-600px bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                    <option>{data?.dob}</option>
                  </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div> */}
            </div>

            
            {/* <div className=" w-300px px-3 ">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-dayofbirth">
                .
              </label>
                <div className="relative">
                  <select className="block appearance-none w-600px bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                    <option>17</option>
                  </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
            </div>
            <div className=" w-300px px-3 ">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-dayofbirth">
                .
              </label>
                <div className="relative">
                  <select className="block appearance-none w-600px bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                    <option>2004</option>
                  </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
            </div> */}
            

              
              
            

          

          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-200  px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                City
              </label>
              <input 
              name="city"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder={data?.city}/>
              {formik.touched.city && formik.errors.city ? (
                            <p className="text-red-500 text-xs italic">{formik.errors.city}</p>
                        ) : null}
            </div>

            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                State
              </label>
              <div className="relative">
                <select 
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                  <option value={data?.state}>{data?.state}</option>
                  <option value='Bangkok'>Bangkok</option>
                  <option>nakhon si thammarat </option>
                  <option>chiang mai </option>
                  <option>ดาวอังคาร </option>
                  <option>ที่ชอบๆ</option>

                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                Zip
              </label>
              <input 
              name="zipCode"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.zipCode}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder={data?.zipCode}/>
              {formik.touched.zipCode && formik.errors.zipCode ? (
                            <p className="text-red-500 text-xs italic">{formik.errors.zipCode}</p>
                        ) : null}
            </div>

            <div className="mt-6 w-full md:w-1/1 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-address">
                Address
              </label>
              <input 
              name="address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-address" type="text" placeholder={data?.address}/>
              {formik.touched.address && formik.errors.address ? (
                            <p className="text-red-500 text-xs italic">{formik.errors.address}</p>
                        ) : null}
            </div>
          </div>

        <div className="mt-8 mb-6 pt-4">
        <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2" htmlFor="Agent Register">
        file graduation certificate
         </label>

        <div className="mt-8 mb-8">
          <input type="file" name="file" id="file" className="sr-only" />
          <label
            for="file"
            className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
          >
            <div>
              <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                Drop files here
              </span>
              <span className="mb-2 block text-base font-medium text-[#6B7280]">
                Or
              </span>
              <span
                className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]"
              >
                Browse
              </span>
            </div>
          </label>
        </div>

        <div className="mb-5 rounded-md bg-[#F5F7FB] py-4 px-8">
          <div className="flex items-center justify-between">
            <span className="truncate pr-3 text-base font-medium text-[#07074D]">
              banner-design.png
            </span>
            <button className="text-[#07074D]">
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="rounded-md bg-[#F5F7FB] py-4 px-8">
          <div className="flex items-center justify-between">
            <span className="truncate pr-3 text-base font-medium text-[#07074D]">
              banner-design.png
            </span>
            <button className="text-[#07074D]">
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          <div className="relative mt-5 h-[6px] w-full rounded-lg bg-[#E2E5EF]">
            <div
              className="absolute left-0 right-0 h-full w-[75%] rounded-lg bg-[#6A64F1]"
            ></div>
          </div>
        </div>
      </div>

      <div>
        <button
          type='submit' 
          className="hover:shadow-form w-full rounded-md bg-sky py-3 px-8 text-center text-base font-semibold text-white outline-none"
        >
          Submit
        </button>

        <label className="block uppercase tracking-wide text-white text-xl font-bold mb-2" htmlFor="Agent Register">
        .
         </label>
      </div>



        {/* ____ */}
        </div>
        
      </form>
    </HelmetProvider>
  )
}
