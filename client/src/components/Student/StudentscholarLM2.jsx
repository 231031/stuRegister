import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Headerstu from './Headerstu';

// <----img---->
import imageU2 from '../../assets/michigan2.jpg';

const text_UNV1 = {
  Introduction: 'Embarking on a journey of higher education at a prestigious institution like Michigan University is a dream for many aspiring students. However, the financial aspect can often be a significant hurdle. Fortunately, there are various avenues available to support students in funding their education at Michigan University. This guide aims to explore these opportunities and provide insights into securing the necessary funding to turn your academic aspirations into reality.',
  Eligibility_Criteria1:'-Applicants must have received an offer of admission to an undergraduate or postgraduate program at the University of Oxford or the University of Cambridge',
  Eligibility_Criteria2:'-Academic merit: Candidates should have a strong academic record, typically evidenced by high grades or equivalent qualifications in their previous studies.',
  Eligibility_Criteria3:'-Demonstrated leadership: Preference may be given to applicants who have shown leadership skills and active involvement in extracurricular activities, such as community service, sports, arts, or student organizations.',
  Eligibility_Criteria4:'-Financial need: While academic merit is paramount, consideration may also be given to candidates who demonstrate financial need and would benefit significantly from scholarship support.'

  

}

export default function SCLM2() {

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
    <section className="bg-cover bg-center py-32 w-full mt-0" style={{backgroundImage: `url(${imageU2})`}}>

        <div className="container mx-auto text-left text-white" >
        <div className="container mx-auto text-left text-white" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
            <div className="flex items-center">
                <div className="w-1/2">
                    <h1 className="text-5xl font-medium mb-6" style={{color: 'white'}}>michigan University</h1>
                    <p className="text-xl mb-12" style={{color: 'white'}}>The University of Michigan, located in Ann Arbor, is one of the leading public research universities in the United States. Renowned for its academic excellence, diverse student body, and robust research programs, Michigan offers a wide range of undergraduate, graduate, and professional degree programs across various disciplines.</p>
                    <button className="bg-indigo-500 text-white py-4 px-12 rounded-full hover:bg-indigo-600">
                    <Link to="/student/StudentScholarform" className="block w-full h-full">
                    Get Start
                    </Link>
                    </button>
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
          Michigan University
          </h2>
          <p className="text-sky text-base md:text-lg">{text_UNV1.Introduction}</p>
        </div>
        <div className="flex items-center space-x-3">
        </div>
      </div>
      <img alt="logo" width={450} height={450} src="https://msu.edu/-/media/assets/msu/images/home/initiatives/strat-plan-thumbnail.jpg?w=600&rev=b801af62b4bc45fd9b352a5ca54a757e&hash=5BC5EFB34024426C895CABD76E14FA5D" />
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

        
      </div>
    </HelmetProvider>
  )
}