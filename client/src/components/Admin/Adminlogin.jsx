import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Adminlogin() {
  return (
    <HelmetProvider>
      <div>
        <Helmet>
            <title>A | Login</title>
        </Helmet>
      </div>
    </HelmetProvider>
  )
}