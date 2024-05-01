import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import tw from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Btn = tw.p` px-6 py-2 text-green-200 cursor-pointer text-base hover:text-yellow-400  border-opacity-50 border-gray-400`;
const List = tw.ul`bg-blue-400 text-gray-900 rounded-md p-1 absolute w-36 flex flex-col items-center bg-opacity-90`;
const Dropdown = tw.div`flex flex-col border-opacity-50 border-gray-400`;
export default function Headeradmin() {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSOpen, setIsSOpen] = useState(false);
  const [isActivityOpen, setIsActivityOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsSOpen(false);
    setIsActivityOpen(false);
  };

  // const toggleCourse = () => {
  //   setIsCourseOpen(!isCourseOpen);
  //   setIsDropdownOpen(false);
  //   setIsSOpen(false);
  //   setIsActivityOpen(false);
  // };

  const toggleScholar = () => {
    setIsDropdownOpen(false);
    setIsActivityOpen(false);
    setIsSOpen(!isSOpen);
  };

  const toggleActivity = () => {
    setIsDropdownOpen(false);
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
            <Btn onClick={toggleDropdown} >Faculty<FontAwesomeIcon className='ml-2' icon="fa-solid fa-caret-down" /></Btn>
            <div className={isDropdownOpen ? 'block' : 'hidden'}>
              <List>
                <li><NavLink to='/admin/addfac'>Add Faculty</NavLink></li>
                <li><NavLink to='/admin/selfac'>All Faculty</NavLink></li>
              </List>
            </div>
          </Dropdown>
          
          <Btn>
            <NavLink to='/admin/students'>Student</NavLink>
          </Btn>

          <Dropdown>
            <Btn onClick={toggleScholar}>Scholarship<FontAwesomeIcon className='ml-2' icon="fa-solid fa-caret-down" /></Btn>
            <div className={isSOpen ? 'block' : 'hidden'}>
              <List>
                <li><NavLink to='/admin/addscholarship'>Add Scholarship</NavLink></li>
                <li><NavLink to='/admin/scholarships'>All Scholarship</NavLink></li>
              </List>
            </div>
          </Dropdown>

          <Btn>
            <NavLink to='/admin/teachers'>Teacher</NavLink>
          </Btn>

          <Btn>
            <NavLink to='/admin/teachers'>Course</NavLink>
          </Btn>

          {/* <Dropdown>
            <Btn onClick={toggleCourse}>Course<FontAwesomeIcon className='ml-2' icon="fa-solid fa-caret-down" /></Btn>
            <div className={isCourseOpen ? 'block' : 'hidden'}>
              <List>
                <li><NavLink to='/admin/addcourse'>Add Course</NavLink></li>
                <li><NavLink to='/admin/courses'>All Course</NavLink></li>
              </List>
            </div>
          </Dropdown> */}

          <Dropdown>
            <Btn onClick={toggleActivity}>Activity<FontAwesomeIcon className='ml-2' icon="fa-solid fa-caret-down" /></Btn>
            <div className={isActivityOpen ? 'block' : 'hidden'}>
              <List>
                <li><NavLink to='/admin/addactivity'>Add Activity</NavLink></li>
                <li><NavLink to='/admin/activitys'>All Activity</NavLink></li>
              </List>
            </div>
          </Dropdown>
        </ul>
      </nav>
    </div>
  )
}