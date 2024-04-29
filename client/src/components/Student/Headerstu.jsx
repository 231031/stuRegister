import React from 'react'
import { Link } from 'react-router-dom'
import tw from 'twin.macro';

const Navlist = tw.li`px-2 py-2 text-green-200 cursor-pointer text-base`;
export default function Headerstu() {
  return (
    <div>
      <nav>
        <ul className='flex flex-wrap bg-sky-800 justify-center divide-y divide-slate-300'>
          <Navlist><Link  to='/student/register'>Course Register</Link></Navlist>
          <Navlist><Link  to='/student/register'>History</Link></Navlist>
          <Navlist><Link  to='/student/register'>History</Link></Navlist>
          <Navlist><Link  to='/student/register'>History</Link></Navlist>
          <Navlist><Link  to='/student/register'>History</Link></Navlist>
          <Navlist><Link  to='/student/register'>History</Link></Navlist>
          <Navlist><Link  to='/student/register'>History</Link></Navlist>
        </ul>
      </nav>
    </div>
  )
}
