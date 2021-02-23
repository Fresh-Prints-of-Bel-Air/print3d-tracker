import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';
// import BuildLogs from '../logs/BuildLogs';
import JobCard from '../cards/JobCard';
import JobNav from '../layout/JobNav';
import JobQueueItem from '../cards/JobQueueItem';
import M from 'materialize-css/dist/js/materialize.min.js';

const Home = ({ user, loadUser }) => {
  useEffect(() => {
    M.AutoInit();
    console.log('Home component mounted');
    loadUser();
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      
      <JobNav/>
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
            <JobQueueItem/>
            <JobQueueItem/>
            <JobQueueItem/>
            <JobQueueItem/>
            <JobQueueItem/>
            <JobQueueItem/>
            <JobQueueItem/>
            <JobQueueItem/>
            <JobQueueItem/>
            
          </div>
        </div>
          
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { loadUser })(Home);
