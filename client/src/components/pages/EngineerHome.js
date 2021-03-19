import React from 'react';
import JobCard from '../cards/JobCard';
import JobQueue from '../cards/JobQueue';
import JobList from '../cards/JobList';

const EngineerHome = () => {
  return (
    <div>
       <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{height: '100vh', width: '49vw', overflow: 'auto'}}>
            <div className="center">Pending Print Job Requests (Jobs that haven't been completed and aren't the user's) add sorting</div>
            <JobList/>
          </div>
          <div style={{height: '100vh', width: '49vw', overflow: 'auto'}}>
            <div className="center">My Print Job Requests 
              (Jobs that are the users have been completed recently or haven't been completed
            </div>
            <JobQueue/>

            
          </div>
        </div>
    </div>
  )
}

export default EngineerHome;