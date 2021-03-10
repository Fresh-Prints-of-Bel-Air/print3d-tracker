import React from 'react'
import { connect } from 'react-redux';
import { getJobs } from '../../actions/jobActions';


export const JobQueueItem = ({ job: { jobs }, getJobs }) => {
  getJobs([]);
    return (
        jobs.map((job) => (
        <div className="card" id={job._id} style={{ backgroundColor: '#323840' }}>
              <div className="card-content white-text">
                <span className="card-title">Card Title</span>
                <p>{jobs.material}</p>
              </div>
              <div className="card-action">
                <a href="#" className="blue-text">This is a link</a>
                <a href="#" className="blue-text">This is a link</a>
              </div>
        </div>
        ))
    )
}

const mapStateToProps = (state) => ({
  job: state.job
})

export default connect(mapStateToProps, {getJobs})(JobQueueItem);