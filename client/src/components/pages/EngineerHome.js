import React from 'react';
import JobCard from '../cards/JobCard';
import JobQueue from '../cards/JobQueue';

const EngineerHome = () => {
  return (
    <div>
       <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{height: '100vh', width: '49vw', overflow: 'auto'}}>
            <ul className="collapsible expandable">
                <li className="active">
                  <div className="collapsible-header">Filter Options</div>
                  <div className="collapsible-body">
                    Filter options
                  </div>
                </li>
                <li className="active">
                    <div className="collapsible-header">Job Requests</div>
                    <div className="collapsible-body">
                      <JobCard />   
                      <JobCard />
                    </div>
                </li>
                <li className="active">
                    <div className="collapsible-header">Accepted Jobs</div>
                    <div className="collapsible-body">
                      <span>Lorem ipsum dolor sit amet.</span>
                    
                    </div>
                </li>
            </ul>
          </div>
          <div style={{height: '100vh', width: '49vw', overflow: 'auto'}}>
            My Job Requests
            <JobQueue/>

            
          </div>
        </div>
    </div>
  )
}

export default EngineerHome;