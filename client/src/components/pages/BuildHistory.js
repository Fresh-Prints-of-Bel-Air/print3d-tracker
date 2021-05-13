import React, { useEffect, useState } from 'react';
import BuildList from '../cards/BuildList';
import BuildSearch from '../cards/BuildSearch';


const BuildHistory = () => {

  const [formDimensions, setFormDimensions] = useState({
    height: '20vh',
    formMarginBtm: '5.5vh',
    buttonHeight: '4vh',
    buttonWidth: '7vw',
    listSize: '73.2vh'

  });

  //maxHeight of Navbar is 6.8vh
  //height of Navbar for 1080p is about 6.8vh
  //height of Navbar for 4k is about 5vh

  useEffect(() => {
    if(window.screen.height * window.devicePixelRatio > 1080)
      setFormDimensions({...formDimensions, height: '16vh', formMarginBtm: '2.5vh', listSize: '79vh'});
  }, []);

  return (
    <div>
      <BuildSearch formDimensions={formDimensions}></BuildSearch>
      <div name='dummydiv' style={{width: '100%', height: formDimensions.height }}></div>
      {/*dummy div is to add space below the build search, which is a fixed div */}
      <BuildList formDimensions={formDimensions}></BuildList>
    </div>
  )
}

export default BuildHistory;