import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


import Headerstu from './Headerstu';

// <----img------>
import Accimg from '../../assets/Acti.jpg';
import AC1 from '../../assets/AC1.jpeg';
import AC2 from '../../assets/AC2.jpg';
import AC3 from '../../assets/Art.jpeg';
import AC4 from '../../assets/AC4.jpg';
import AC5 from '../../assets/LASU.jpg';
import AC6 from '../../assets/AI.jpeg';


// <----text------>
const text_AC = {
  AC1: 'Are you ready to unleash your potential and dive into a world of endless possibilities? Look no further! Our university is buzzing with excitement, and we want YOU to be a part of it',
  AC2: '  Dont miss out on this incredible opportunity to learn, grow, and thrive in a supportive and inspiring community of fellow students and faculty members',
  AC3: 'Oxford Univer',
  AC4: 'University clubs and activities ',
  AC5: 'Join our University clubs and activities and unleash your potential today! Calling all students! Are you ready to dive into a world of excitement and opportunity',

  ACC1: 'Academic Clubs' ,
  ACC1_2: 'Expand your knowledge and sharpen your skills with our academic clubs. Whether you are interested in science, math, debate, or language, there is a club for you to thrive in.',
  ACC2: 'Sports Teams',
  ACC2_1: 'Join our winning teams and experience the thrill of competition! From basketball to soccer, volleyball to swimming, discover your passion for sports and teamwork.',
  ACC3: 'Creative Arts',
  ACC3_1: 'Unleash your creativity and express yourself through our art, music, and drama clubs. Dive into the world of creativity and let your imagination soar.',
  ACC4: 'Community Service',
  ACC4_1: 'Make a difference in the world around you by joining our community service initiatives. From environmental conservation to helping the less fortunate, be a part of something meaningful.',
  ACC5:'Cultural Clubs',
  ACC5_1: 'Celebrate diversity and learn about different cultures through our cultural clubs. Explore traditions, languages, and cuisines from around the world.',
  ACC6:'Technology and Innovation Clubs',
  ACC6_1: 'Are you fascinated by the world of technology and innovation? Join our tech clubs where you can explore coding, robotics, and digital design. Be part of groundbreaking projects and turn your ideas into reality.'
  

}

export default function AllActivity() {

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


        {/* <---section1-----> */}

<body>
    <div i>
    <section className=" w-dvw max-h-[80rem] relative">
        <div className="absolute inset-0 z-[1]">
            <img className="h-100 w-full object-cover bg-center mt-0" src={Accimg} alt=""  />
        </div>
        <div className="max-w-[120rem] mx-auto h-full relative z-[2] px-6 md:px-8 lg:px-10">
            <div className="h-full w-full  flex flex-col relative space-y-6">
                <div className="mt-10 mb-0 text-gray-50 md:pb-36 space-y-10 ">
                    <span className="font-light text-sm text-accent-500 ">Unlock Your Potential</span>
                    <h1 className="text-3xl md:text-5xl max-w-[30rem] font-medium">Activity </h1>
                    <p className="max-w-[30rem] font-light ml-4 before:content-[''] relative before:absolute before:w-px before:h-full before:left-0 before:top-0 before:-translate-x-4 before:bg-accent-500 md:text-base text-sm">{text_AC.AC1}{text_AC.AC2}</p>
                    
                </div>
                <div className="md:absolute md:right-0 md:bottom-32 text-gray-50 my-16">
                    <ul className="flex md:flex-col items-center justify-center gap-2">
                        <li className="h-6 w-6 block rounded-full bg-accent-400 text-gray-50">
                            <a href="" className="block h-full w-full p-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current " viewBox="0 0 24 24"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M0 0h24v24H0z"></path><path fill="currentColor" d="M18 2a1 1 0 0 1 .993.883L19 3v4a1 1 0 0 1-.883.993L18 8h-3v1h3a1 1 0 0 1 .991 1.131l-.02.112l-1 4a1 1 0 0 1-.858.75L17 15h-2v6a1 1 0 0 1-.883.993L14 22h-4a1 1 0 0 1-.993-.883L9 21v-6H7a1 1 0 0 1-.993-.883L6 14v-4a1 1 0 0 1 .883-.993L7 9h2V8a6 6 0 0 1 5.775-5.996L15 2z"></path></g>
                                </svg>
                            </a>
                        </li>
                        <li className="h-6 w-6 block rounded-full bg-accent-400 text-gray-50"><a href="" className="h-full w-full block p-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-full h-full fill-current "><path d="M256.283 47.553c70.693 0 128 54.682 118 128.931-2.072 15.388-3.422 31.483-4.26 44.759 0 0 2.402 4.253 12.664 4.253 6.071 0 14.895-1.543 27.596-6.354 2.236-.847 4.377-1.241 6.377-1.241 7.918 0 13.615 5.931 14.123 12.271.426 5.31-4.564 11.199-8.371 13.009-13.766 6.542-46.991 10.063-46.991 32.638 0 22.576 22.362 46.656 40.862 63.713S480 360.602 480 360.602s.283 21.57-31.717 29.097c-32 7.524-32.1 5.712-33.25 13.796-2.133 14.979-1.535 21.378-11.248 21.378-1.672 0-3.651-.19-6.002-.558-8.23-1.291-19.239-3.644-31.121-3.644-11.216 0-23.21 2.097-34.379 9.161-23 14.549-41.283 34.114-76.283 34.114s-53-19.565-76-34.114c-11.17-7.065-23.162-9.161-34.379-9.161-11.88 0-22.892 2.353-31.121 3.644-2.352.367-4.33.558-6.002.558-9.71 0-9.115-6.399-11.248-21.378-1.151-8.084-1.25-6.27-33.25-13.795s-32-29.097-32-29.097 45.5-4.012 64-21.068c18.5-17.058 40.862-41.134 40.862-63.71 0-22.575-33.226-26.09-46.991-32.632-3.807-1.81-8.796-7.687-8.371-12.997.507-6.336 6.196-12.251 14.107-12.25 2.004 0 4.152.38 6.393 1.229 12.749 4.829 21.588 6.342 27.662 6.342 10.204 0 12.598-4.273 12.598-4.273-.837-13.275-2.187-29.371-4.259-44.759-10-74.249 47.307-128.931 118-128.931M256.283 32H256c-41.093 0-79.215 16.208-104.591 45.341-23.982 27.534-34.375 63.345-29.265 101.292 1.416 10.51 2.46 21.231 3.21 30.618-3.97-.559-9.686-1.998-17.703-5.034-3.965-1.502-8.017-2.295-12.043-2.295-15.641-.001-28.844 11.852-30.057 27.003-1.027 12.818 8.235 24.393 17.47 28.783 4.251 2.02 9.181 3.578 14.4 5.232 6.707 2.125 14.309 4.532 19.293 7.703 4.147 2.639 4.147 4.168 4.147 5.182 0 8.66-6.191 24.691-35.688 51.888-10.499 9.681-39.055 15.501-54.588 16.897l-14.572 1.311L16 360.603c0 1.679.312 10.546 6.485 20.319 5.246 8.306 16.073 19.283 37.863 24.407a1139.713 1139.713 0 0 0 15.208 3.454c2.306.512 4.555 1.01 6.454 1.453l.081.623c.9 7.004 1.611 12.535 4.392 17.75 2.453 4.6 8.574 12.316 22.015 12.316 2.478 0 5.249-.246 8.472-.751 1.672-.263 3.386-.554 5.2-.863 7.116-1.212 15.182-2.587 23.451-2.587 10.277 0 18.732 2.188 25.846 6.688 4.531 2.867 8.892 5.972 13.509 9.26C202.967 465.481 223.358 480 256 480c32.726 0 53.293-14.582 71.439-27.446 4.576-3.244 8.898-6.309 13.377-9.142 7.113-4.5 15.568-6.688 25.846-6.688 8.27 0 16.334 1.375 23.449 2.586 1.814.311 3.529.602 5.202.864 3.223.505 5.993.751 8.472.751 13.44 0 19.562-7.715 22.015-12.313 2.781-5.214 3.492-10.746 4.392-17.749l.082-.629c1.898-.441 4.148-.941 6.455-1.452 4.023-.892 9.029-2.001 15.206-3.454 21.851-5.139 32.611-16.17 37.79-24.518 6.098-9.828 6.296-18.736 6.273-20.422l-.189-14.501-14.398-1.278c-15.413-1.396-43.8-7.219-54.301-16.9-16.281-15.011-35.688-36.199-35.688-51.893 0-1.014 0-2.546 4.15-5.186 4.985-3.174 12.589-5.584 19.297-7.71 5.217-1.654 10.144-3.217 14.394-5.236 9.236-4.39 18.498-15.978 17.471-28.807-1.215-15.166-14.424-27.046-30.072-27.046-4.021 0-8.068.76-12.027 2.259-8.027 3.041-13.743 4.41-17.705 4.962.747-9.319 1.791-20.12 3.211-30.67 5.111-37.948-5.281-73.509-29.264-101.042C335.498 48.208 297.376 32 256.283 32z" fill="currentColor"></path><path d="M256 229c-20.838 0-40.604-8.29-55.657-23.343a8 8 0 1 1 11.313-11.313C223.688 206.374 239.436 213 256 213c16.387 0 32.15-6.64 44.385-18.698a8 8 0 0 1 11.23 11.395C296.368 220.725 276.617 229 256 229z" fill="currentColor"></path><ellipse cx="208" cy="152" rx="16" ry="24" fill="currentColor"></ellipse><ellipse cx="304" cy="152" rx="16" ry="24" fill="currentColor"></ellipse></svg></a></li><li className="h-6 w-6 block rounded-full bg-accent-400 text-gray-50 p-1"><svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-none stroke-current " viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" fill="none"></line></svg></li></ul></div></div></div></section></div>
</body>

        {/* <----section3-----> */}
        <section class="text-gray-400 body-font">
        <div class="container px-2 py-24 mx-auto">
    
      {/* <div class="h-1 bg-gray-800 rounded overflow-hidden">
        <div class="w-24 h-full bg-indigo-500"></div>
      </div> */}
      <div class="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
        <h1 class="sm:w-2/5 text-black font-medium title-font text-2xl mb-2 sm:mb-0"> {text_AC.AC4} </h1>
        <p class="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">{text_AC.AC5}</p>
      </div>
    <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
      <div class="p-4 md:w-1/3 sm:mb-0 mb-6">
        <div class="rounded-lg h-64 overflow-hidden">
          <img alt="content" class="object-cover object-center h-full w-full" src={AC1}/>
        </div>
        <h2 class="text-xl font-medium title-font text-black mt-5">{text_AC.ACC1}</h2>
        <p class="text-base leading-relaxed mt-2">{text_AC.ACC1_2}</p>
        
        <div className='mt-3 flex flex-row-reverse'>
        <div className="mb-4">
        <button className="bg-[#0d9488] hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 border border-[#0d9488] hover:border-transparent rounded mr-1">
          <Link to="" className="block w-full h-full">
            Accept
          </Link>
        </button>

        <button className="bg-Slate-100 hover:bg-[#6b7280] text-[#0d9488] font-semibold hover:text-white py-2 px-4 border border-[#0d9488] hover:border-transparent rounded ml-auto">
          <Link to="/Student/StudentAC1" className="block w-full h-full">
            Learn More
          </Link>
        </button>

      </div>
        
</div>



      {/* <---section3---> */}
      </div>
      <div class="p-4 md:w-1/3 sm:mb-0 mb-6">
        <div class="rounded-lg h-64 overflow-hidden">
          <img alt="content" class="object-cover object-center h-full w-full" src={AC2}/>
        </div>
        <h2 class="text-xl font-medium title-font text-black mt-5">{text_AC.ACC2}</h2>
        <p class="text-base leading-relaxed mt-2">{text_AC.ACC2_1}</p>

        <div className='mt-3 flex flex-row-reverse'>
          <div className="mb-4">
          <button className="bg-[#0d9488] hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 border border-[#0d9488] hover:border-transparent rounded mr-1">
          <Link to="" className="block w-full h-full">
            Accept
          </Link>
          </button>

          <button className="bg-Slate-100 hover:bg-[#6b7280] text-[#0d9488] font-semibold hover:text-white py-2 px-4 border border-[#0d9488] hover:border-transparent rounded ml-auto">
          <Link to="/Student/StudentAC2" className="block w-full h-full">
            Learn More
          </Link>
        </button>
          </div>


        </div>

        
        
        
      </div>
      <div class="p-4 md:w-1/3 sm:mb-0 mb-6">
        <div class="rounded-lg h-64 overflow-hidden">
          <img alt="content" class="object-cover object-center h-full w-full" src={AC3}/>
        </div>
        <h2 class="text-xl font-medium title-font text-black mt-5">{text_AC.ACC3}</h2>
        <p class="text-base leading-relaxed mt-2">{text_AC.ACC3_1}</p>

        <div className='mt-3 flex flex-row-reverse'>
          <div className="mb-4">
          <button className="bg-[#0d9488] hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 border border-[#0d9488] hover:border-transparent rounded mr-1">
          <Link to="" className="block w-full h-full">
            Accept
          </Link>
          </button>

          <button className="bg-Slate-100 hover:bg-[#6b7280] text-[#0d9488] font-semibold hover:text-white py-2 px-4 border border-[#0d9488] hover:border-transparent rounded ml-auto">
          <Link to="/Student/StudentAC3" className="block w-full h-full">
            Learn More
          </Link>
        </button>
          </div>
        </div>  
      </div>

      <div class="p-4 md:w-1/3 sm:mb-0 mb-6">
        <div class="rounded-lg h-64 overflow-hidden">
          <img alt="content" class="object-cover object-center h-full w-full" src={AC4}/>
        </div>
        <h2 class="text-xl font-medium title-font text-black mt-5">{text_AC.ACC4}</h2>
        <p class="text-base leading-relaxed mt-2">{text_AC.ACC4_1}</p>

        <div className='mt-3 flex flex-row-reverse'>
          <div className="mb-4">
          <button className="bg-[#0d9488] hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 border border-[#0d9488] hover:border-transparent rounded mr-1">
          <Link to="" className="block w-full h-full">
            Accept
          </Link>
          </button>

          <button className="bg-Slate-100 hover:bg-[#6b7280] text-[#0d9488] font-semibold hover:text-white py-2 px-4 border border-[#0d9488] hover:border-transparent rounded ml-auto">
          <Link to="/Student/StudentAC4" className="block w-full h-full">
            Learn More
          </Link>
        </button>
          </div>
        </div>  
      </div>

      <div class="p-4 md:w-1/3 sm:mb-0 mb-6">
        <div class="rounded-lg h-64 overflow-hidden">
          <img alt="content" class="object-cover object-center h-full w-full" src={AC5}/>
        </div>
        <h2 class="text-xl font-medium title-font text-black mt-5">{text_AC.ACC5}</h2>
        <p class="text-base leading-relaxed mt-2">{text_AC.ACC5_1}</p>

        <div className='mt-3 flex flex-row-reverse'>
          <div className="mb-4">
          <button className="bg-[#0d9488] hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 border border-[#0d9488] hover:border-transparent rounded mr-1">
          <Link to="" className="block w-full h-full">
            Accept
          </Link>
          </button>

          <button className="bg-Slate-100 hover:bg-[#6b7280] text-[#0d9488] font-semibold hover:text-white py-2 px-4 border border-[#0d9488] hover:border-transparent rounded ml-auto">
          <Link to="/Student/StudentAC5" className="block w-full h-full">
            Learn More
          </Link>
        </button>
          </div>
        </div>  
      </div>


      <div class="p-4 md:w-1/3 sm:mb-0 mb-6">
        <div class="rounded-lg h-64 overflow-hidden">
          <img alt="content" class="object-cover object-center h-full w-full" src={AC6}/>
        </div>
        <h2 class="text-xl font-medium title-font text-black mt-5">{text_AC.AC6}</h2>
        <p class="text-base leading-relaxed mt-2">{text_AC.ACC6_1}</p>

        <div className='mt-3 flex flex-row-reverse'>
          <div className="mb-4">
          <button className="bg-[#0d9488] hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 border border-[#0d9488] hover:border-transparent rounded mr-1">
          <Link to="" className="block w-full h-full">
            Accept
          </Link>
          </button>

          <button className="bg-Slate-100 hover:bg-[#6b7280] text-[#0d9488] font-semibold hover:text-white py-2 px-4 border border-[#0d9488] hover:border-transparent rounded ml-auto">
          <Link to="/Student/StudentAC6" className="block w-full h-full">
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
    </HelmetProvider>
  )
}