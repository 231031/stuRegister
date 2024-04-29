import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Adminaddscholar() {
  return (
    <HelmetProvider>
      <div className='container'>
        <Helmet>
          <title>A | AddScholar</title>
        </Helmet>
      </div>
    </HelmetProvider>
  )
}
