import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { addBuild } from '../../actions/buildActions';
import { getJobs } from '../../actions/jobActions';
import M from 'materialize-css';

const CreateBuildModal = ({job: {jobs}, addBuild, getJobs}) => {
  useEffect(() => {
    M.AutoInit();
    getJobs({}); //only gets incomplete jobs by default
  },[]);

  return (
    <div>
    {/*select from available jobs that haven't yet been completed*/}
    <div id='buildModal'className='modal modal-fixed-footer'>
      <div className="modal-content">
        <div className="row">
          {jobs.map((job) => )}
          {/* create a select dropdown with all of the jobs that have yet to be completed */}
        </div>
      
      </div>
    </div>  
    </div>
  )
}

const mapStateToProps = (state) => ({
  job: state.job,
});

export default connect(mapStateToProps, {addBuild, getJobs})(CreateBuildModal);