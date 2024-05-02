import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Headeradmin from './Headeradmin';

export default function Adminhome() {
  return (
    <HelmetProvider>
    <div>
      <Helmet>
          <title>A | Home</title>
      </Helmet>
      <Headeradmin/>
    </div>
    </HelmetProvider>
  )
}
