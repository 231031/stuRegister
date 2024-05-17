import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import tw from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Btn = tw.p` px-8 py-3 flex text-lowyellow cursor-pointer text-base hover:text-lowbrown items-center justify-center w-48`;
const List = tw.ul`bg-lowgreen text-lowyellow rounded-md w-48 mt-2 p-1 absolute flex flex-col items-center  bg-opacity-90 z-50`;
const Dropdown = tw.div`flex flex-col border-opacity-50 border-lowyellow`;
export default function Headerstu({ data }) {

  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isCourseOpen, setIsCourseOpen] = useState(false);
  const [isActivityOpen, setIsActivityOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isScholarOpen, setIsScholarOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
  };

  const toggleInfo = () => {
    setIsInfoOpen(!isInfoOpen);
    setIsCourseOpen(false);
    setIsActivityOpen(false);
    setIsScholarOpen(false);
    setIsUserOpen(false);
  };

  const toggleCourse = () => {
    setIsCourseOpen(!isCourseOpen);
    setIsInfoOpen(false);
    setIsActivityOpen(false);
    setIsScholarOpen(false);
    setIsUserOpen(false);
  };

  const toggleActivity = () => {
    setIsCourseOpen(false);
    setIsInfoOpen(false);
    setIsActivityOpen(!isActivityOpen);
    setIsScholarOpen(false);
    setIsUserOpen(false);
  }; 

  const toggleUser = () => {
    setIsCourseOpen(false);
    setIsInfoOpen(false);
    setIsActivityOpen(false);
    setIsScholarOpen(false);
    setIsUserOpen(!isUserOpen);
  };

  const toggleScholar = () => {
    setIsCourseOpen(false);
    setIsInfoOpen(false);
    setIsActivityOpen(false);
    setIsUserOpen(false);
    setIsScholarOpen(!isScholarOpen);
  };

  return (
    <div>
       <nav className=' bg-darkgreen'>
        <ul className='flex flex-wrap justify-center items-center '>
          <Btn>
            <NavLink to='/student/home'>Home</NavLink>
          </Btn>

          <Dropdown>
            <Btn onClick={toggleInfo}>Information<FontAwesomeIcon className='ml-2' icon="fa-solid fa-caret-down" /></Btn>
            <div className={isInfoOpen ? 'block' : 'hidden'}>
              <List >
                <li><NavLink to='/student/update'>Personal</NavLink></li>
                <li><NavLink to='/student/eduhis'>Education</NavLink></li>
                
              </List>
            </div>
          </Dropdown>

          <Dropdown>
            <Btn onClick={toggleScholar}>Scholarship<FontAwesomeIcon className='ml-2' icon="fa-solid fa-caret-down" /></Btn>
            <div className={isScholarOpen ? 'block' : 'hidden'}>
              <List >
                <li><NavLink to='/student/scholarship'>Scholarship</NavLink></li>
                <li><NavLink to='/student/statusscholar'>Status</NavLink></li>
              </List>
            </div>
          </Dropdown>

          <Dropdown>
            <Btn onClick={toggleCourse}>Course<FontAwesomeIcon className='ml-2' icon="fa-solid fa-caret-down" /></Btn>
            <div className={isCourseOpen ? 'block' : 'hidden'}>
              <List>
                <li><NavLink to='/student/courses'>Course Detail</NavLink></li>
                <li><NavLink to='/student/regiscourse'>Register Course</NavLink></li>
                <li><NavLink to='/student/mycourse'>My Course</NavLink></li>
              </List>
            </div>
          </Dropdown>

          <Dropdown>
            <Btn onClick={toggleActivity}>Activity<FontAwesomeIcon className='ml-2' icon="fa-solid fa-caret-down" /></Btn>
            <div className={isActivityOpen ? 'block' : 'hidden'}>
              <List>
                <li><NavLink to='/student/activity'>All Activity</NavLink></li>
                <li><NavLink to='/student/myactivity'>Attended Activity</NavLink></li>
                <li><NavLink to='/student/evaluate'>Evaluate Activity</NavLink></li>
              </List>
            </div>
          </Dropdown> 
          {/* <div  className='text-white text-xs flex flex-col justify-center items-center 
          absolute right-5 border-opacity-50 border-gray-400 pl-6' icon="fa-solid fa-circle-user">
            <p>ID : {data?.student_id}</p>
            <p>Year : {data?.year}</p>  
          </div> */}
          <Dropdown>
            <Btn onClick={toggleUser}><FontAwesomeIcon className='ml-2 size-9' icon="fa-solid fa-circle-user" /></Btn>
            <div className={isUserOpen ? 'block' : 'hidden'}>
              <List className='w-46'>
                <li><p>ID : {data?.student_id}</p></li>
                <li>
                  {
                    (data?.year > 10) ? (
                      <p>Year : {new Date().getFullYear() + 543 - data?.year}</p>
                    ) : (
                      <p>Year : {data?.year}</p>
                    )
                  }
                </li>
                  <li><NavLink to='/' >Change user view</NavLink></li>
                  <li onClick={logout}><NavLink to='/student/login'>Log Out</NavLink></li>
                
              </List>
            </div>
          </Dropdown>
        </ul>
        
        
      </nav>
    </div>
  )
}