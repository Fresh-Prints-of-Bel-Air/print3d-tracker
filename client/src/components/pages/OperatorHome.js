import React from 'react';
import JobCard from '../cards/JobCard';
import JobQueue from '../cards/JobQueue';
import JobList from '../cards/JobList';

const OperatorHome = () => {
  return (
    <div style={{backgroundImage: "url(/images/mountain_low_contrast.jpg"}}>
      <div style={{marginRight: '8%', marginLeft: '8%'}}>
        <div className="row" style={{backgroundColor: 'black', marginBottom: '15px'}}>
          <div className="col s1"></div>
          <div className="center col s4 white" style={{border: '2px solid black'}}>My Print Job Requests 
                  (Jobs that are the users have been completed recently or haven't been completed
          </div>
          <div className="col s2"></div>
          <div className="center col s4 white" style={{border: '2px solid black'}}>Job Queue
          </div>
          <div className="col s1"></div>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div style={{height: '100vh', width: '49vw', overflow: 'auto', marginRight: '10px'}}>
              <JobList/>
            </div>
            <div style={{height: '100vh', width: '49vw', overflow: 'auto', marginLeft: '10px'}}>
              <JobQueue/>
              
            </div>
          </div>
      </div>
    </div>
      
  )
}

export default OperatorHome;