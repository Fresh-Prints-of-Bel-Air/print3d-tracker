import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';
// import BuildLogs from '../logs/BuildLogs';
import JobCard from '../cards/JobCard';
import JobNav from '../layout/JobNav';
import RequestJobModal from '../modals/RequestJobModal';
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
        <div style={{display: 'flex'}}>
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
            <div class="card blue-grey darken-1">
              <div class="card-content white-text">
                <span class="card-title">Card Title</span>
                <p>I am a very simple card. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively.</p>
              </div>
              <div class="card-action">
                <a href="#">This is a link</a>
                <a href="#">This is a link</a>
              </div>
            </div>
            <div class="card blue-grey darken-1">
              <div class="card-content white-text">
                <span class="card-title">Card Title</span>
                <p>I am a very simple card. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively.</p>
              </div>
              <div class="card-action">
                <a href="#">This is a link</a>
                <a href="#">This is a link</a>
              </div>
            </div>
            <div class="card blue-grey darken-1">
              <div class="card-content white-text">
                <span class="card-title">Card Title</span>
                <p>I am a very simple card. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively.</p>
              </div>
              <div class="card-action">
                <a href="#">This is a link</a>
                <a href="#">This is a link</a>
              </div>
            </div>
            <div class="card blue-grey darken-1">
              <div class="card-content white-text">
                <span class="card-title">Card Title</span>
                <p>I am a very simple card. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively.</p>
              </div>
              <div class="card-action">
                <a href="#">This is a link</a>
                <a href="#">This is a link</a>
              </div>
            </div>
            <div class="card blue-grey darken-1">
              <div class="card-content white-text">
                <span class="card-title">Card Title</span>
                <p>I am a very simple card. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively.</p>
              </div>
              <div class="card-action">
                <a href="#">This is a link</a>
                <a href="#">This is a link</a>
              </div>
            </div>
            <div class="card blue-grey darken-1">
              <div class="card-content white-text">
                <span class="card-title">Card Title</span>
                <p>I am a very simple card. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively.</p>
              </div>
              <div class="card-action">
                <a href="#">This is a link</a>
                <a href="#">This is a link</a>
              </div>
            </div>
            <div class="card blue-grey darken-1">
              <div class="card-content white-text">
                <span class="card-title">Card Title</span>
                <p>I am a very simple card. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively.</p>
              </div>
              <div class="card-action">
                <a href="#">This is a link</a>
                <a href="#">This is a link</a>
              </div>
            </div>
          </div>
        </div>
          
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { loadUser })(Home);
