import React from 'react';
import { NavLink } from 'react-router-dom'
import tw from 'twin.macro';

const Btn = tw.p` px-8 py-2 text-white cursor-pointer text-base hover:text-yellow-400  border-opacity-50 border-gray-400`;
export default function Headerteacher({ data }) {

  return (
    <div>
       <nav className=' bg-sky'>
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

          <div className='text-white text-xs justify-center items-center 
          absolute right-5 border-opacity-50 border-gray-400 pl-6'>
            <p>ID : {data?.teacher_id}</p>
            <p>POS : {data?.position}</p>
          </div>
        </ul>
      </nav>
    </div>
  )
}


