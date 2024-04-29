import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Teacherhome() {
  return (
    <HelmetProvider>
        <Helmet>
            <title>T | Home</title>
        </Helmet>
        <div>Teacherhome</div>
    </HelmetProvider>
  )
}
