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
  const [isCourseOpen, setIsCourseOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsSOpen(false);
    setIsActivityOpen(false);
    setIsCourseOpen(false);
  };

  const toggleCourse = () => {
    setIsCourseOpen(!isCourseOpen);
    setIsDropdownOpen(false);
    setIsSOpen(false);
    setIsActivityOpen(false);
  };

  const toggleScholar = () => {
    setIsDropdownOpen(false);
    setIsActivityOpen(false);
    setIsCourseOpen(false);
    setIsSOpen(!isSOpen);
  };

  const toggleActivity = () => {
    setIsDropdownOpen(false);
    setIsSOpen(false);
    setIsCourseOpen(false);
    setIsActivityOpen(!isActivityOpen);
  };

  const toggleUser = () => {
    setIsDropdownOpen(false);
    setIsSOpen(false);
    setIsCourseOpen(false);
    setIsActivityOpen(false);
    setIsUserOpen(!isUserOpen);
  };

  return (
    <div>
       <nav>
        <ul className='flex flex-wrap bg-sky justify-center divide-x-2 text-sm'>
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
            <NavLink to='/admin/selstudent'>Student</NavLink>
          </Btn>

          <Dropdown>
            <Btn onClick={toggleScholar}>Scholarship<FontAwesomeIcon className='ml-2' icon="fa-solid fa-caret-down" /></Btn>
            <div className={isSOpen ? 'block' : 'hidden'}>
              <List>
                <li><NavLink to='/admin/addscholarship'>Add Scholarship</NavLink></li>
                <li><NavLink to='/admin/selscholar'>All Scholarship</NavLink></li>
              </List>
            </div>
          </Dropdown>

          <Btn>
            <NavLink to='/admin/selteacher'>Teacher</NavLink>
          </Btn>

          <Dropdown>
            <Btn onClick={toggleCourse}>Course<FontAwesomeIcon className='ml-2' icon="fa-solid fa-caret-down" /></Btn>
            <div className={isCourseOpen ? 'block' : 'hidden'}>
              <List>
                <li><NavLink to='/admin/selcourse'>All Course</NavLink></li>
                <li><NavLink to='/admin/tableavailable'>Available Course</NavLink></li>
              </List>
            </div>
          </Dropdown>

          <Dropdown>
            <Btn onClick={toggleActivity}>Activity<FontAwesomeIcon className='ml-2' icon="fa-solid fa-caret-down" /></Btn>
            <div className={isActivityOpen ? 'block' : 'hidden'}>
              <List>
                <li><NavLink to='/admin/addactivity'>Add Activity</NavLink></li>
                <li><NavLink to='/admin/activitys'>All Activity</NavLink></li>
              </List>
            </div>
          </Dropdown>
          <Dropdown>
            <Btn onClick={toggleUser}><FontAwesomeIcon className='ml-2' icon="fa-solid fa-circle-user" /></Btn>
            <div className={isUserOpen ? 'block' : 'hidden'}>
              <List className='w-46'>
                <li><NavLink to='/components/Landing'>Change user view</NavLink></li>
                <li><NavLink to='/admin/login'>Log Out</NavLink></li>
              </List>
            </div>
          </Dropdown>
        </ul>
      </nav>
    </div>
  )
}
