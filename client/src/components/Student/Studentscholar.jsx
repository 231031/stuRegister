import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Studentscholar() {
  return (
    <HelmetProvider>
      <div>
      <Helmet>
          <title>Stu | Scholarship</title>
      </Helmet>
      </div>
    </HelmetProvider>
  )
}
