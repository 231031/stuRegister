import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import Headerstu from './Headerstu';

// <----img---->
import imageU1 from '../../assets/oxbridge.jpeg';
import imageU1_2 from '../../assets/a.jpg';

const text_UNV1 = {
  Introduction: 'Securing a scholarship to study at Oxbridge University is a dream for many aspiring students worldwide. The opportunity to immerse oneself in the rich academic tradition of institutions like the University of Oxford and the University of Cambridge is both intellectually stimulating and personally fulfilling. However, gaining admission and funding for such prestigious universities can be daunting. This article explores the significance of scholarships for aspiring Oxbridge students and offers guidance on how to secure them.',
  Eligibility_Criteria1:'-Applicants must have received an offer of admission to an undergraduate or postgraduate program at the University of Oxford or the University of Cambridge',
  Eligibility_Criteria2:'-Academic merit: Candidates should have a strong academic record, typically evidenced by high grades or equivalent qualifications in their previous studies.',
  Eligibility_Criteria3:'-Demonstrated leadership: Preference may be given to applicants who have shown leadership skills and active involvement in extracurricular activities, such as community service, sports, arts, or student organizations.',
  Eligibility_Criteria4:'-Financial need: While academic merit is paramount, consideration may also be given to candidates who demonstrate financial need and would benefit significantly from scholarship support.'

  

}


export default function SCLM1() {

    const navigate = useNavigate();
    const [data, setData] = useState('');
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/student/login');
        }
        const [department_id, year, student_id] = token.split('-');
        setData({
          department_id: department_id,
          year: year,
          student_id: student_id,
        });
      }, []);

  return (
    <HelmetProvider>
      <div>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <Helmet>
            <title>Stu | All activity</title>
        </Helmet> 
        <Headerstu data={data}/>

        {/* <---section1----> */}
        <div className="bg-gray-50 flex items-center">
    <section className="bg-cover bg-center py-32 w-full mt-0" style={{backgroundImage: `url(${imageU1_2})`}}>

        <div className="container mx-auto text-left text-white" >
            <div className="flex items-center">
            <div className="container mx-auto text-center text-white" style={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}}>
                <div className="w">
                    <h1 className="text-5xl font-medium mb-6" style={{color: 'white'}}>Oxbridge University</h1>
                    <p className="text-xl mb-12" style={{color: 'white'}}>Oxbridge University is a colloquial term used to refer collectively to the two oldest and most prestigious universities in the United Kingdom: the University of Oxford and the University of Cambridge. These institutions are renowned worldwide for their academic excellence, historic traditions, and significant contributions to research and education across various fields. The term "Oxbridge" is often used to signify a high standard of education and intellectual rigor.</p>
                    <a href="#" className="bg-indigo-500 text-white py-4 px-12 rounded-full hover:bg-indigo-600">Get start</a>
                </div>
                <div className="w-1/2 pl-16">
                </div>
                </div>
            </div>
        </div>

    </section>
</div>

        {/* <---section2----> */}

        <div className="w-full my-20 z-50 sticky rounded-3xl px-6 bg-[#fafafa]">
  <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
    <div className="flex flex-col items-center justify-between w-full mb-10 lg:flex-row">
      <div className="mb-16 lg:mb-0 lg:max-w-lg lg:pr-5">
        <div className="max-w-xl mb-6">
          <h2 className="font-sans text-3xl font-bold tracking-tight text-sky sm:text-4xl sm:leading-none max-w-lg mb-6">
          Oxbridge University
          </h2>
          <p className="text-sky text-base md:text-lg">{text_UNV1.Introduction}</p>
        </div>
        <div className="flex items-center space-x-3">
        </div>
      </div>
      <img alt="logo" width={450} height={450} src="data:image/jpeg;base64,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" />
    </div>
  </div>
</div>


        {/* <--section3-> */}

        <div className="w-full my-20 z-50  rounded-3xl px-6 ">
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="flex flex-col items-center justify-between w-full mb-10 lg:flex-row">

            <div className="mb-16 lg:mb-0 lg:max-w-lg lg:pr-5 ">
              <div className="max-w-xl mb-6 mx-auto ">
                <h2 className="font-sans text-3xl font-bold tracking-tight text-sky sm:text-4xl sm:leading-none max-w-lg mb-6">
                Eligibility Criteria
                </h2>
                <p className="text-sky text-base md:text-lg">{text_UNV1.Eligibility_Criteria1}</p>
                <p className="text-sky text-base md:text-lg">{text_UNV1.Eligibility_Criteria2}</p>
              </div>
              <div className="flex items-center space-x-3">
              </div>
            </div>

            <div className="mb-16 lg:mb-0 lg:max-w-lg lg:pr-5 ">
              <div className="max-w-xl mb-6 mx-auto ">
                <h2 className="font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none max-w-lg mb-6">.
                </h2>
                <p className="text-sky text-base md:text-lg">{text_UNV1.Eligibility_Criteria3}</p>
                <p className="text-sky text-base md:text-lg">{text_UNV1.Eligibility_Criteria4}</p>
              </div>
              <div className="flex items-center space-x-3">
              </div>
            </div>



        </div>
      </div>

      

      
</div>





    
        {/* <-----> */}
      </div>
    </HelmetProvider>
  )
}