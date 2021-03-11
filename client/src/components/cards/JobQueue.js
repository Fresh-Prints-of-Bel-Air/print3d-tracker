import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { getJobs } from '../../actions/jobActions';
import JobQueueItem from './JobQueueItem';

export const JobQueue = ({ job: { jobs }, getJobs }) => {
    
    //getJobs({});

    useEffect(() => {
        getJobs({});
        console.log("Jobqueue useEffect called");
        //jobs.forEach((job) => console.log(job));
    }, []);
    return (
        jobs.map((jobEntry) => <JobQueueItem job={jobEntry} key={jobEntry._id} />)
    )
}

const mapStateToProps = (state) => ({
  job: state.job
})

export default connect(mapStateToProps, {getJobs})(JobQueue);