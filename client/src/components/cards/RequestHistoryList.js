import React from 'react';
import { connect } from 'react-redux';
import RequestHistoryItem from './RequestHistoryItem';

const RequestHistoryList = ({ job: { jobs } }) => {
  console.log("Request History job IDs in the list");
  jobs.forEach((job) => console.log(job._id));
  return (
    <div style={{ backgroundImage: "url(/images/mountain_low_contrast.jpg"}}>
        {jobs.length === 0 ? (
            <p className='center' style={{backgroundColor: 'white', opacity: '1.0'}}>No builds to show...</p>
        ) : (
            jobs.map((jobEntry) => <RequestHistoryItem job={jobEntry} key={jobEntry._id} />)
        )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  job: state.job
});

export default connect(mapStateToProps)(RequestHistoryList);