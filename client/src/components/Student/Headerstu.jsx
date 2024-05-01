import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import tw from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Btn = tw.p` px-6 py-2 text-green-200 cursor-pointer text-base hover:text-yellow-400  border-opacity-50 border-gray-400`;
const List = tw.ul`bg-blue-400 text-gray-900 rounded-md p-1 absolute w-48 flex flex-col items-center bg-opacity-90`;
const Dropdown = tw.div`flex flex-col border-opacity-50 border-gray-400`;
export default function Headerstu() {

  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isCourseOpen, setIsCourseOpen] = useState(false);
  const [isSOpen, setIsSOpen] = useState(false);
  const [isActivityOpen, setIsActivityOpen] = useState(false);

  const toggleInfo = () => {
    setIsInfoOpen(!isInfoOpen);
    setIsCourseOpen(false);
    setIsSOpen(false);
    setIsActivityOpen(false);
  };

  const toggleCourse = () => {
    setIsCourseOpen(!isCourseOpen);
    setIsInfoOpen(false);
    setIsSOpen(false);
    setIsActivityOpen(false);
  };

  const toggleScholar = () => {
    setIsCourseOpen(false);
    setIsInfoOpen(false);
    setIsActivityOpen(false);
    setIsSOpen(!isSOpen);
  };

  const toggleActivity = () => {
    setIsCourseOpen(false);
    setIsInfoOpen(false);
    setIsSOpen(false);
    setIsActivityOpen(!isActivityOpen);
  };

  return (
    <div>
       <nav>
        <ul className='flex flex-wrap bg-sky-800 justify-center divide-x-2'>
          <Btn>
            <NavLink to='/admin/home'>Home</NavLink>
          </Btn>

          <Dropdown>
            <Btn onClick={toggleInfo}>Information<FontAwesomeIcon className='ml-2' icon="fa-solid fa-caret-down" /></Btn>
            <div className={isInfoOpen ? 'block' : 'hidden'}>
              <List>
                <li><NavLink to='/admin/addfac'>Personal</NavLink></li>
                <li><NavLink to='/admin/selfac'>Education</NavLink></li>
              </List>
            </div>
          </Dropdown>

          <Dropdown>
            <Btn onClick={toggleScholar}>Scholarship<FontAwesomeIcon className='ml-2' icon="fa-solid fa-caret-down" /></Btn>
            <div className={isSOpen ? 'block' : 'hidden'}>
              <List>
                <li><NavLink to='/admin/addscholarship'>All Scholarship</NavLink></li>
                <li><NavLink to='/admin/scholarships'>Apply Scholarship</NavLink></li>
              </List>
            </div>
          </Dropdown>

          <Dropdown>
            <Btn onClick={toggleCourse}>Course<FontAwesomeIcon className='ml-2' icon="fa-solid fa-caret-down" /></Btn>
            <div className={isCourseOpen ? 'block' : 'hidden'}>
              <List>
                <li><NavLink to='/admin/addcourse'>Course Detail</NavLink></li>
                <li><NavLink to='/admin/courses'>Course Register</NavLink></li>
              </List>
            </div>
          </Dropdown>

          <Dropdown>
            <Btn onClick={toggleActivity}>Activity<FontAwesomeIcon className='ml-2' icon="fa-solid fa-caret-down" /></Btn>
            <div className={isActivityOpen ? 'block' : 'hidden'}>
              <List className='w-46'>
                <li><NavLink to='/admin/addactivity'>Attended Activity</NavLink></li>
                <li><NavLink to='/admin/activitys'>Evaluate Activity</NavLink></li>
              </List>
            </div>
          </Dropdown>

         
        </ul>
      </nav>
    </div>
  )
}


