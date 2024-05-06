import React, { useState, useEffect } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

import Headerstu from './Headerstu';


const text_UNV = {
  UNV1: 'Oxbridge      28/8/2024',
  UNV2: 'michigan University      11/7/2024',
  UNV3: 'Oxford University      2/12/2024',

  UNV1_de: 'Oxbridge, synonymous with excellence, thrives in the historic cities of Oxford and Cambridge, nestled in the idyllic English countryside.',
  UNV2_de: 'Michigan, a state of diverse landscapes and vibrant cities, boasts the iconic Great Lakes and bustling urban centers the American Midwest. ',
  UNV3_de: 'Oxford University, nestled in the historic city of Oxford, England, is a renowned bastion of learning and scholarship.'

}


// image all
import imagee from '../../assets/sc1.png';
import imageU1 from '../../assets/oxbridge.jpeg';
import imageU2 from '../../assets/U2.webp'
import imageU3 from '../../assets/U3.jpeg';


export default function Studentscholar() {

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
          <title>Stu | Scholarship</title>
      </Helmet>
      <Headerstu data={data}/>
      



    <header>
    {/* <!-- Section 1 --> */}
    <div className="flex flex-row">
    <div className="container mx-auto px-5 mt-9 h-96 rounded-md flex items-center" style={{ backgroundImage: `url(${imagee})` }}>
      <div className="sm:ml-20 text-gray-40 text-center sm:text-left">
        <h1 className="text-5xl font-bol mb-4">
        Free Scholarships For Every Bright <br />
        Student In KMUTT ! 
        </h1>
        <h3>Get free scholarship for every level of education that every <br/>
        student who achieves for a bright future can get</h3>
      </div>
    </div>
    </div>
    
    {/* <!-- Section 2 --> */}
  </header>
  <section className="text-gray-400 bg-white-900 body-font">
  <div className="container px-2 py-24 mx-auto">
    <div className="flex flex-col">
      {/* <div className="h-1 bg-gray-800 rounded overflow-hidden">
        <div className="w-24 h-full bg-indigo-500"></div>
      </div> */}
      <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
        <h1 className="sm:w-2/5 text-black font-medium title-font text-2xl mb-2 sm:mb-0"> News  Sholarships </h1>
        <p className="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">Exciting scholarship opportunity! Support your education until 2025 with financial aid and internships worldwide. Don't miss out!</p>
      </div>
    </div>
    <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
      <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
        <div className="rounded-lg h-64 overflow-hidden">
          <img alt="content" className="object-cover object-center h-full w-full" src={imageU1}/>
        </div>
        <h2 className="text-xl font-medium title-font text-black mt-5">{text_UNV.UNV1}</h2>
        <p className="text-base leading-relaxed mt-2">{text_UNV.UNV1_de}</p>
        
        <div className='mt-3 flex flex-row-reverse'>
        <div className="mb-4">
        <button className="bg-sky hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 border border-sky hover:border-transparent rounded mr-1">
          <Link to="/student/StudentScholarform" className="block w-full h-full">
            Get Start
          </Link>
        </button>

        <button className="bg-Slate-100 hover:bg-[#6b7280] text-black font-semibold hover:text-white py-2 px-4 border border-sky hover:border-transparent rounded ml-auto">
          <Link to="/student/StudentscholarLM1" className="block w-full h-full">
            Learn More
          </Link>
        </button>

      </div>
        
</div>



      {/* <---section3---> */}
      </div>
      <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
        <div className="rounded-lg h-64 overflow-hidden">
          <img alt="content" className="object-cover object-center h-full w-full" src={imageU2}/>
        </div>
        <h2 className="text-xl font-medium title-font text-black mt-5">{text_UNV.UNV2}</h2>
        <p className="text-base leading-relaxed mt-2">{text_UNV.UNV2_de}</p>

        <div className='mt-3 flex flex-row-reverse'>
          <div className="mb-4">
          <button className="bg-sky hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 border border-sky hover:border-transparent rounded mr-1">
          <Link to="/student/StudentScholarform" className="block w-full h-full">
            Get Start
          </Link>
          </button>

          <button className="bg-Slate-100 hover:bg-[#6b7280] text-black font-semibold hover:text-white py-2 px-4 border border-sky hover:border-transparent rounded ml-auto">
          <Link to="/student/StudentscholarLM2" className="block w-full h-full">
            Learn More
          </Link>
        </button>
          </div>


        </div>

        
        
        
      </div>
      <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
        <div className="rounded-lg h-64 overflow-hidden">
          <img alt="content" className="object-cover object-center h-full w-full" src={imageU3}/>
        </div>
        <h2 className="text-xl font-medium title-font text-black mt-5">{text_UNV.UNV3}</h2>
        <p className="text-base leading-relaxed mt-2">{text_UNV.UNV3_de}</p>

        <div className='mt-3 flex flex-row-reverse'>
          <div className="mb-4">
          <button className="bg-sky hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 border border-sky hover:border-transparent rounded mr-1">
          <Link to="/student/StudentScholarform" className="block w-full h-full">
            Get Start
          </Link>
          </button>

          <button className="bg-Slate-100 hover:bg-[#6b7280] text-black font-semibold hover:text-white py-2 px-4 border border-sky hover:border-transparent rounded ml-auto">
          <Link to="/student/StudentscholarLM3" className="block w-full h-full">
            Learn More
          </Link>
        </button>
          </div>
        </div>  
      </div>

      
    </div>
  </div>
</section>
    </div>

    {/* <!-- Section 3 --> */}
      
    </HelmetProvider>
  )
}