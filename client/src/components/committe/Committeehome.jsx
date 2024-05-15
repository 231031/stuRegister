import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { getAvgF, getAvgM } from "../../helpers/comHelper";
import Headercom from "./Headercom";

export default function Committeehome() {

    const [data, setData] = useState("");
    const [salary_f, setF] = useState("");


    useEffect(() => {
        const apiSalaryF = async () => {
            try {
                const res = await getAvgF();
                setF(res);
            } catch (error) {
                console.error(error);
            }
        };
        apiSalaryF();
    }, []);

    return (
        <HelmetProvider>
            <div>
                <Helmet>
                    <title>C | Home</title>
                </Helmet>
                <Headercom />





            </div>
        </HelmetProvider>
    )
}
