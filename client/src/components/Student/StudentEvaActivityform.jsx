import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Headerstu from './Headerstu';

const FeedbackForm = () => {
    // State for free text inputs
    const [freeText1, setFreeText1] = useState('');
  
}

// ป้องกัน การโหลดหน้าใหม่ --> หลังส่ง form
const handleSubmit = (e) => {
    e.preventDefault();
};

// Questions and message
const text = {
    intro :'Thank you for your time and contributions!',
    intro1 : 'Now, we are looking to gather insights and feedback from participants like you to further enhance our future activities and ensure they continue to meet your needs and expectations. ',
    massage :'This is a test message to appear on the feedback form at the top.',

    Q1: "How valuable was the information within this course?",
    Q2: "How clear were the explanations within this course?",
    Q3: "How engaging did you find the delivery of this course?",
    Q4: "How helpful were the practice activities within this course?",
    Q5: "How accurate was the description of this course?",
    Q6: "How knowledgeable were the instructor/s of this course?",
    ftQ1: "Additional Comments",
  };





export default function EvaForm() {

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
            <title>Stu | Attended Activity</title>
        </Helmet> 
        <Headerstu data={data}/>

        <div className='container px-2 py-24 mx-auto'>
            <div id="feedbackModal" className="feedbackModal">
            <div className="modalContent">
                <h1 class="text-center text-3xl font-semibold capitalize text-sky dark:text-sky lg:text-4xl">Feedback Activity</h1>
                <h2 style={{ textAlign: 'center', marginTop: '0px' }}>{text.intro}</h2>


                <div className = 'container mt-3'>
                    <h1  class='text-center  text-gray-600  '>This is a test message to appear on the feedback form at the top.</h1><br />
                </div>
                
            <form id="feedback" className="formFeedback" method="POST" onSubmit={handleSubmit}>

                {/* <----Render radio button questions----> */}


                <div className='contianer px-80  mx-auto '>
                    {/* อันนี้ change text -> key-value  */}
                    {Object.entries(text).map(([key, value]) => {
                        if (key.startsWith('Q')) {
                        return (
                            <div key={key}>
                            <span className=" text-sky dark:text-sky lg:text-xl">{value}<br /><br /></span>
                            <span className="radioForm">

                                {['  ไม่เริ่ดอ่อมมาก  ', '  ก็โอเค...  ', '  เฉยๆ  ', '  เริ่ดอะคุนน้า  ','  สุดปังงง  '].map((choice) => (

                                <label key={`${key}-${choice}`} htmlFor={`${key}-${choice}`}>
                                    <input type="radio" id={`${key}-${choice}`} name={key} value={choice} />
                                    {choice}<br />
                                    
                                </label>
                                ))}


                            </span>
                            <div className="clearfix"></div><br />
                            </div>
                        );
                        }
                        return null;
                    })}

                    {/* <---feedback box ----> */}

                    <div id="ftQ1Container">
                        <span id="ftQ1" class="text-sky dark:text-sky lg:text-xl">{text.ftQ1}<br /></span><br />
                            <textarea
                                id="freeText1"
                                className="freeText"
                                name="freeText1"
                                rows="5"
                                cols="45"
                                value={FeedbackForm.freeText1}
                                onChange={(e) => setFreeText1(e.target.value)}
                                >
                            </textarea>
                        <div className="clearfix"></div><br />
                    </div>      
                    <button className="bg-sky hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 border border-sky hover:border-transparent rounded mr-1 " style={{ position: 'relative', left: '50%', transform: 'translate(-50%, 0%)' }}>
                        <Link to="" className="block w-full h-full">
                            Submit
                        </Link>
                    </button>            
                </div>

            

                    
            </form>
        </div>
        </div>
        </div>

        

    
        
      </div>
    </HelmetProvider>
  )
}