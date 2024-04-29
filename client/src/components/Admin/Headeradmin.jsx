import React from 'react'
import { Link } from 'react-router-dom'
import tw from 'twin.macro';

const Navlist = tw.li`px-2 py-2 text-green-200 cursor-pointer text-base hover:text-yellow-400`;
export default function Headeradmin() {
  return (
    <div>
      <nav>
        <ul className='flex flex-wrap bg-sky-800 justify-center'>
            <Navlist><Link  to='/admin/home'>Home</Link></Navlist>
            <Navlist><Link  to='/admin/selfac'>Faculty</Link></Navlist>
            <Navlist><Link  to='/admin/selcourse'>Course</Link></Navlist>
            {/* <Navlist><Link  to='/admin/students'>Student</Link></Navlist>
            <Navlist><Link  to='/admin/teachers'>Teacher</Link></Navlist> */}
        </ul>
      </nav>
    </div>
  )
}

{/* <Navlist><Link  to='/admin/addscholar'>Scholarship</Link></Navlist>
            <Navlist><Link  to='/admin/addscholar'>Scholarship Request</Link></Navlist> */}
