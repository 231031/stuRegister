import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Headeradmin from './Headeradmin';
import { getTeacher } from '../../helpers/helper';

export default function Admintablescholarstu() {

  const [teacher, setTeacher] = useState('');
  useEffect(()=>{
    const apiTeacher = async () => {
      try {
        const res = await getTeacher();
        setTeacher(res);

      } catch (error) {
          toast.error('Cannot Get Information');
          console.error(error);
      } 
    };
    apiTeacher();
  }, []);
  
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

