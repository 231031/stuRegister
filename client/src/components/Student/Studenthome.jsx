import React from 'react';
import { Formik, Field, Form } from "formik";
import { Link } from 'react-router-dom';
import tw from 'twin.macro';
import { Toaster } from 'react-hot-toast';
import toast from "react-hot-toast";
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { UpdateSchema } from '../../Validations/validation';
import { updateStudent } from '../../helpers/stuhelper';

const Alert = tw.div`text-red-700 text-sm`;
export default function Studenthome() {
  
  return (
    <HelmetProvider>
      <div className='container'>
        <Helmet>
            <title>Stu | Home</title>
        </Helmet>
        <h1>home stu</h1>
      </div>
    </HelmetProvider>
    
  )
}
