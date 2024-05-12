import React from 'react';
import { NavLink } from 'react-router-dom'
import tw from 'twin.macro';

const Btn = tw.p` px-8 py-2 text-white cursor-pointer text-base hover:text-yellow-400  border-opacity-50 border-gray-400`;
export default function Headercom() {

  return (
    <div>
       <nav className=' bg-sky'>
        <ul className='flex flex-wrap justify-center items-center divide-x-2'>
          <Btn>
            <NavLink to='/committee/home'>Home</NavLink>
          </Btn>

          <Btn>
            <NavLink to='/committee/tablestu'>Applicant</NavLink>
          </Btn>

          <Btn>
            <NavLink to='/committee/evastu'>Evaluate</NavLink>
          </Btn>

        </ul>
      </nav>
    </div>
  )
}


