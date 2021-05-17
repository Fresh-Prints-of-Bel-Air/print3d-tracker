import React, { useState, useEffect } from 'react';
import RequestHistorySearch from '../cards/RequestHistorySearch';
import RequestHistoryList from '../cards/RequestHistoryList';

const RequestHistoryPage = () => {
  const [formDimensions, setFormDimensions] = useState({
    height: '22vh',
    formMarginBtm: '5.5vh',
    buttonHeight: '4.5vh',
    buttonWidth: '8vw',
    listSize: '71.2vh'

  });

  //maxHeight of Navbar is 6.8vh
  //height of Navbar for 1080p is about 6.8vh
  //height of Navbar for 4k is about 5vh
  
  useEffect(() => {
    // if(window.screen.height * window.devicePixelRatio > 1080)
    //   setFormDimensions({...formDimensions, height: '16vh', formMarginBtm: '2.5vh', listSize: '79vh'});
  }, []);
  return (
    <div>
      <RequestHistorySearch formDimensions={formDimensions}/>
      <RequestHistoryList formDimensions={formDimensions}/>
    </div>
  )
}

export default RequestHistoryPage;