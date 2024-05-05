import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import tw from 'twin.macro';

import Headeradmin from './Headeradmin';

const Box = tw.div`ml-10 w-1/4 h-3/4 bg-blue-200 rounded-md drop-shadow-xl`;
export default function Adminhome() {
  return (
    <HelmetProvider>
    <div>
      <Helmet>
          <title>A | Home</title>
      </Helmet>
      <Headeradmin/>
      <div className='bg-slate-300 h-[calc(100vh-40px)]'>
        <h4 className='text-xl text-center text-blue-800 font-bold pt-5'>Information Report</h4>
        <div className='flex flex-row items-center justify-center h-5/6 text-sm '>
          <Box>
            <p>The number of teachers teach course in each faculty</p>
          </Box>
          <Box>
            <p>The number of teachers teach course in each faculty</p>
          </Box>
          <Box>
            <p>The number of teachers teach course in each faculty</p>
          </Box>
        </div>
      </div>
      
      
    </div>
    </HelmetProvider>
  )
}
