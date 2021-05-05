import React, { useEffect } from 'react';
import BuildList from '../cards/BuildList';
import BuildSearch from '../cards/BuildSearch';


const BuildHistory = () => {


  return (
    <div>
      <BuildSearch></BuildSearch>
      <BuildList></BuildList>
    </div>
  )
}

export default BuildHistory;