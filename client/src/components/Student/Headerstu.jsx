import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import tw from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Btn = tw.p` px-8 py-2 text-lowyellow cursor-pointer text-base hover:text-greendark  border-opacity-50 border-lowyellow`;
const List = tw.ul`bg-sky text-lowyellow rounded-md p-1 absolute w-40 flex flex-col items-center bg-opacity-90`;
const Dropdown = tw.div`flex flex-col border-opacity-50 border-lowyellow`;
export default function Headerstu({ data }) {

  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isCourseOpen, setIsCourseOpen] = useState(false);
  const [isActivityOpen, setIsActivityOpen] = useState(false);

  const toggleInfo = () => {
    setIsInfoOpen(!isInfoOpen);
    setIsCourseOpen(false);
    setIsActivityOpen(false);
  };

  const toggleCourse = () => {
    setIsCourseOpen(!isCourseOpen);
    setIsInfoOpen(false);
    setIsActivityOpen(false);
  };

  const toggleActivity = () => {
    setIsCourseOpen(false);
    setIsInfoOpen(false);
    setIsActivityOpen(!isActivityOpen);
  };  
  const toggleUser = () => {
    setIsCourseOpen(false);
    setIsInfoOpen(false);
    setIsActivityOpen(!isActivityOpen);
  };

  return (
    <div>
       <nav className=' bg-sky'>
        <ul className='flex flex-wrap justify-center items-center divide-x-2'>
          <Btn>
            <NavLink to='/student/home'>Home</NavLink>
          </Btn>

          <Dropdown>
            <Btn onClick={toggleInfo}>Information<FontAwesomeIcon className='ml-2' icon="fa-solid fa-caret-down" /></Btn>
            <div className={isInfoOpen ? 'block' : 'hidden'}>
              <List>
                <li><NavLink to='/student/update'>Personal</NavLink></li>
                <li><NavLink to='/student/eduhis'>Education</NavLink></li>
                
              </List>
            </div>
          </Dropdown>

          <Btn>
            <NavLink to='/student/scholarship'>Scholarship</NavLink>
          </Btn>

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
              <List className='w-46'>
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
            <Btn onClick={toggleUser}><FontAwesomeIcon className='ml-1 flex justify-end items-center 
          absolute right-6' icon="fa-solid fa-circle-user" /></Btn>
            <div className={isActivityOpen ? 'block' : 'hidden'}>
              <List className='w-46'>
                <li><p>ID : {data?.student_id}</p></li>
                <li><p>Year : {data?.year}</p></li>
                <li><NavLink to='/components/landing'>Change user views</NavLink></li>
              </List>
            </div>
          </Dropdown>
        </ul>
        
        
      </nav>
    </div>
  )
}