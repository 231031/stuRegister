import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { evaActivity } from '../../helpers/stuhelper';
import Headerstu from './Headerstu';





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



// ป้องกัน การโหลดหน้าใหม่ --> หลังส่ง form
const handleSubmit = (e) => {
    e.preventDefault();
};

export default function EvaForm() {

    const location = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState('');
    const [eva, setEva] = useState('');
    const [freeText1, setFreeText1] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/student/login');
        }

        if (location.state) {
            setEva({
                'activity_id' : location.state.activity_id,
                'hours' : location.state.hours
            })
        }
        else navigate('/student/evaluate');

        const [department_id, year, student_id] = token.split('-');
        setData({
          department_id: department_id,
          year: year,
          student_id: student_id,
        });
        
      }, []);

    async function evaluateAc(e) {
        try {
            e.preventDefault();
            const res = await evaActivity(eva, data.student_id);
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
            <title>Stu | Attended Activity</title>
        </Helmet> 
        <Headerstu data={data}/>

        <div className='container px-2 py-24 mx-auto'>
            <div id="feedbackModal" className="feedbackModal">
            <div className="modalContent">
                <h1 className="text-center text-3xl font-semibold capitalize text-sky dark:text-sky lg:text-4xl">Feedback Activity</h1>
                <h2 style={{ textAlign: 'center', marginTop: '0px' }}>{text.intro}</h2>


                <div className = 'container mt-3'>
                    <h1  className='text-center  text-gray-600  '>This is a test message to appear on the feedback form at the top.</h1><br />
                </div>
                
            <form id="feedback" className="formFeedback" method="POST" onSubmit={(e)=>evaluateAc(e)}>

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
                        <span id="ftQ1" className="text-sky dark:text-sky lg:text-xl">{text.ftQ1}<br /></span><br />
                            <textarea
                                id="freeText1"
                                className="freeText border-2"
                                name="freeText1"
                                rows="5"
                                cols="45"
                                onChange={(e) => setFreeText1(e.target.value)}
                                >
                            </textarea>
                        <div className="clearfix"></div><br />
                    </div>      
                    <button 
                    className="bg-sky hover:bg-Slate text-white font-semibold hover:text-black py-2 px-4 border border-sky hover:border-transparent rounded mr-1 " style={{ position: 'relative', left: '50%', transform: 'translate(-50%, 0%)' }}>
                        Submit
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