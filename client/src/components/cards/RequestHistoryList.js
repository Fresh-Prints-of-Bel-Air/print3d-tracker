import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { resetJobState } from '../../actions/jobActions';
import RequestHistoryItem from './RequestHistoryItem';

const RequestHistoryList = ({ job: { jobs }, resetJobState, formDimensions }) => {
  console.log("Request History job IDs in the list");
  //formDimensions for 1080p
  // height: '20vh',
  // formMarginBtm: '8.5vh',
  // buttonHeight: '4vh',
  // buttonWidth: '7vw',
  // listSize: '73.2vh'

  useEffect(() => {
    resetJobState();
  },[]);

  jobs.forEach((job) => console.log(job._id));
  return (
    <div style={{backgroundImage: jobs.length !== 0 && "url(/images/mountain_low_contrast.jpg)", maxHeight: formDimensions.listSize, overflow: 'auto'}}>
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