import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { resetJobState } from '../../actions/jobActions';
import RequestHistoryItem from './RequestHistoryItem';

const RequestHistoryList = ({ job: { jobs }, resetJobState }) => {
  console.log("Request History job IDs in the list");

  useEffect(() => {
    resetJobState();
  },[]);

  jobs.forEach((job) => console.log(job._id));
  return (
    <div style={{ backgroundImage: "url(/images/mountain_low_contrast.jpg"}}>
        {jobs.length === 0 ? (
            <p className='center' style={{backgroundColor: 'white', opacity: '1.0'}}>No job requests to show...</p>
        ) : (
            jobs.map((jobEntry) => <RequestHistoryItem job={jobEntry} key={jobEntry._id} />)
        )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  job: state.job
});

export default connect(mapStateToProps, { resetJobState })(RequestHistoryList);