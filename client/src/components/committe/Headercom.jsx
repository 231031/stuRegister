import React from 'react';
import { NavLink } from 'react-router-dom'
import tw from 'twin.macro';

const Btn = tw.p` px-8 py-3 flex text-lowyellow cursor-pointer text-base hover:text-lowbrown items-center justify-center w-48`;
export default function Headercom() {

  return (
    <div>
       <nav className=' bg-darkgreen'>
        <ul className='flex flex-wrap justify-center items-center'>
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

{/* <div>
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
    </div> */}


