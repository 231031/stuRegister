import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import tw from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Btn = tw.p` px-8 py-2 text-white cursor-pointer text-base hover:text-lowbrown  border-opacity-50 border-gray-400`;
const List = tw.ul`bg-lowgreen text-lowyellow rounded-md p-1 absolute w-40 flex flex-col items-center bg-opacity-90`;
const Dropdown = tw.div`flex flex-col border-opacity-50 border-lowyellow`;
export default function Headerteacher({ data }) {
  const [isUserOpen, setIsUserOpen] = useState(false);

  const toggleUser = () => {
    setIsUserOpen(!isUserOpen);
  };
  return (
    <div>
       <nav className=' bg-darkgreen'>
        <ul className='flex flex-wrap justify-center items-center divide-x-2'>
          <Btn>
            <NavLink to='/teacher/home'>Home</NavLink>
          </Btn>

          <Btn>
            <NavLink to='/teacher/personal'>Personal</NavLink>
          </Btn>

          <Btn>
            <NavLink to='/teacher/selcourse'>Course</NavLink>
          </Btn>

          {/* <div className='text-white text-xs justify-center items-center 
          absolute right-5 border-opacity-50 border-gray-400 pl-6'>
            <p>ID : {data?.teacher_id}</p>
            <p>POS : {data?.position}</p>
          </div> */}
          <Dropdown>
            <Btn onClick={toggleUser}><FontAwesomeIcon className='ml-2' icon="fa-solid fa-circle-user" /></Btn>
            <div className={isUserOpen ? 'block' : 'hidden'}>
              <List className='w-46'>
                <li><p>ID : {data?.teacher_id}</p></li>
                <li><p>POS : {data?.position}</p></li>
                <li><NavLink to='/components/Landing'>Change user view</NavLink></li>
                <li><NavLink to='/teacher/login'>Log Out</NavLink></li>
              </List>
            </div>
          </Dropdown>
        </ul>
      </nav>
    </div>
  )
}


