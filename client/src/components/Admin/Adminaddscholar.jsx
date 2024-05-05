import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Headeradmin from './Headeradmin';

export default function Adminaddscholar() {
  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <title>A | AddScholar</title>
        </Helmet>
        <Headeradmin/>
      </div>
    </HelmetProvider>
  )
}
