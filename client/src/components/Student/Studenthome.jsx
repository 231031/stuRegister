import React from 'react';
import { Formik, Field, Form } from "formik";
import { Link } from 'react-router-dom';
import tw from 'twin.macro';
import { Toaster } from 'react-hot-toast';
import toast from "react-hot-toast";

import { UpdateSchema } from '../../Validations/validation';
import { updateStudent } from '../../helpers/stuhelper';

const Alert = tw.div`text-red-700 text-sm`;
export default function Studenthome() {
  
  return (
    <div>
      <h1>home stu</h1>
    </div>
  )
}
