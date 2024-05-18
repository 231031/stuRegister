import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { getAvgF, getAvgM } from "../../helpers/comHelper";
import Headercom from "./Headercom";

const Row = tw.td`border-2 border-slate-600 py-1 px-2 text-sm`;

export default function Committeehome() {

    const [data, setData] = useState("");
    const [salary_f, setF] = useState("");
    const [salary_m, setM] = useState("");


    useEffect(() => {
        const apiSalaryF = async () => {
            try {
                const res = await getAvgF();
                setF(res);
            } catch (error) {
                console.error(error);
            }
        };
        const apiSalaryM = async () => {
            try {
                const res = await getAvgM();
                setM(res);
            } catch (error) {
                console.error(error);
            }
        };
        apiSalaryF();
        apiSalaryM();
    }, []);

    return (
        <HelmetProvider>
            <div>
                <Helmet>
                    <title>C | Home</title>
                </Helmet>
                <Headercom />
                <div className="w-full flex flex-row bg-yellow-100  h-[calc(100vh-40px)] ">
                    <div className="w-1/2 flex flex-col items-center my-10">
                        <h3 className="font-bold mt-3">Advanced Analysis</h3>
                        <h3 className="font-bold">The Average Mother's Salary of Each Faculty</h3>
                        {
                            (salary_f.length > 0) ? (
                                <table className='w-3/4 my-3 table-fixed border-collapse border border-slate-500 text-center'>
                                    <thead>
                                        <tr className='font-bold'>
                                            <Row>Num</Row>
                                            <Row>Student ID</Row>
                                            <Row>Student Name</Row>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            salary_f.map((fList, index) => (
                                                <tr key={index}>
                                                    <Row>{index + 1}</Row>
                                                    <Row>{fList.faculty_name}</Row>
                                                    <Row>{fList.avg_salary}</Row>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-red-800 font-bold text-center">Not Have salary Data Available</p>
                            )
                        }

                    </div>
                    <div className="w-1/2 flex flex-col items-center my-10">
                        <h3 className="font-bold mt-3">Advanced Analysis</h3>
                        <h3 className="font-bold">The Average Mother's Salary of Each Faculty</h3>
                        {
                            (salary_m.length > 0) ? (
                                <table className=' w-3/4 my-3 table-fixed border-collapse border border-slate-500 text-center'>
                                    <thead>
                                        <tr className='font-bold'>
                                            <Row>Num</Row>
                                            <Row>Faculty Name</Row>
                                            <Row>Average Salary</Row>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            salary_m.map((mList, index) => (
                                                <tr key={index}>
                                                    <Row>{index + 1}</Row>
                                                    <Row>{mList.faculty_name}</Row>
                                                    <Row>{mList.avg_salary}</Row>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-red-800 font-bold text-center">Not Have salary Data Available</p>
                            )
                        }

                    </div>


                </div>




            </div>
        </HelmetProvider>
    )
}
