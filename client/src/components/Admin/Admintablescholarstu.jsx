import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Headeradmin from './Headeradmin';

export default function Admintablescholarstu() {
  return (
    <HelmetProvider>
    <div>
      <Helmet>
          <title>A | TableScholarStu</title>
      </Helmet>
      <Headeradmin/>
    </div>
    </HelmetProvider>
  )
}

