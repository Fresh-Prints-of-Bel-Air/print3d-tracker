import React from 'react';
import JobCard from '../cards/JobCard';
import JobQueue from '../cards/JobQueue';
import JobList from '../cards/JobList';
import MyJobList from '../cards/MyJobList';

const EngineerHome = () => {
  return (
    <div style={{backgroundImage: "url(/images/mountain_low_contrast.jpg"}}>
      <div style={{marginRight: '8%', marginLeft: '8%'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', }}>
          <div style={{height: '12vh', width: '41vw', position: 'fixed', zIndex: '8',}}>
            <div 
              className="card center white-text grey darken-4" 
              style={{
                paddingTop: '5px',
                paddingBottom: '5px', 
                paddingRight: '0px',
                paddingLeft: '0px',
                marginTop: '0px'
              }}
            >
              <h5>My Print Job Requests</h5>  
            </div>
          </div>
          <div style={{height: '12vh', width: '41vw', position: 'fixed', zIndex: '8', right: '8vw'}}>
            <div 
              className="card center white-text grey darken-4" 
              style={{
                paddingTop: '5px',
                paddingBottom: '5px', 
                paddingRight: '0px',
                paddingLeft: '0px',  
                marginTop: '0px'
              }}
            >
              <h5>Other Print Job Requests</h5>  
            </div>
          </div>
        </div>
        <div name="dummy-div" style={{ height: '8vh' }}></div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{height: '100vh', width: '41vw', overflow: 'auto', }}>
            <MyJobList/>
          </div>
          <div style={{height: '100vh', width: '41vw', overflow: 'auto', }}>
            <JobList/>
          </div>
        </div>
      </div>
    </div>
      
  )
}

export default EngineerHome;