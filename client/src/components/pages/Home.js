import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';
import BuildLogs from '../logs/BuildLogs';
import JobCard from '../cards/JobCard';
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
      <RequestJobModal />

      <div>
        <ul className="collapsible expandable">
            <li className="active">
                <div className="collapsible-header">Job Requests</div>
                <div className="collapsible-body">
                  <JobCard />   
                  <JobCard />
                </div>
            </li>
            <li className="active">
                <div className="collapsible-header">Accepted Jobs</div>
                <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span>
                
                </div>
            </li>
        </ul>
      </div>
    </div>
    

    
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { loadUser })(Home);
