import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import toast, { Toaster } from 'react-hot-toast';

import { delTeacher, getDeTeacherAc } from '../../helpers/adminHelper';
import Headeradmin from './Headeradmin';

export default function Admindelteacher() {

    const navigate = useNavigate();
    const location = useLocation();

    const [teacher, setTeacher] = useState("");
    const [del_teacher, setDel] = useState("");
    const [sel, setSel] = useState("");

    useEffect(() => {
        if (location.state) {
            const { teacher_id, first_name, last_name, department_id } = location.state;
            setDel({
                teacher_id: teacher_id,
                first_name: first_name,
                last_name: last_name,
                department_id: department_id,
            });
            const apiTeacher = async () => {
                try {
                    const res = await getDeTeacherAc(location.state.department_id);
                    setTeacher(res);
                } catch (error) {
                    console.error(error);
                }
            };
            apiTeacher();
        }
        else navigate('/admin/selteacher');
    }, []);


    async function handleClick() {
        try {
            const res = await delTeacher(del_teacher.teacher_id, sel);
            toast.success(res.msg);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <HelmetProvider>
            <div>
                <Toaster position='top-center' reverseOrder={false}></Toaster>

                <Helmet>
                    <title>A | TableTeacher</title>
                </Helmet>
                <Headeradmin />
                <div className='flex flex-col items-center my-8 w-full'>
                    <div className='flex flex-row'>
                        <h3 className='font-bold text-red-800 mr-5'>Take Responsible of Teacher : </h3>
                        <h3 className='font-bold'>{del_teacher?.first_name} {del_teacher?.last_name}</h3>
                    </div>
                    {
                        (teacher.length > 0) ? (
                            <div className='flex flex-col mt-5 w-1/2'>
                                <label htmlFor='sel' className='font-bold'>Select teacher who take responsible</label>
                                <select
                                    className='border-2 border-sky   rounded-md' id='sel'
                                    onChange={(e) => setSel(e.target.value)}>
                                    <option value=''></option>
                                    {
                                        teacher.map((tList, index) => (
                                            <option key={index} value={tList.teacher_id}>{tList.teacher_id} {tList.first_name} {tList.last_name}</option>
                                        ))
                                    }
                                </select>
                                <button onClick={(e) => handleClick()}
                                    className='px-1 py-2 bg-sky w-1/6 my-5 rounded-md'>SUBMIT</button>
                            </div>

                        ) : (
                            <p className='font-bold'>No Teacher for Choose Right Now</p>
                        )
                    }

                </div>
            </div>
        </HelmetProvider>
    )

}
