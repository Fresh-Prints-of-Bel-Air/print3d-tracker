import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { getJobs } from '../../actions/jobActions';
import { getJobsByIdArray } from '../../actions/jobActions';
import JobCard from './JobCard';
import JobQueueItem from './JobQueueItem';

// the list of the user's requested jobs

export const MyRequestedJobList = ({ job: { jobs, userJobs }, user: { user }, getJobs, getJobsByIdArray }) => {
    useEffect(() => {
        console.log("user is: ");
        console.log(user);
        console.log("User's requested-job IDs:");
        console.log(user.requestedJobs);
        getJobsByIdArray(user.requestedJobs);
        //getJobs({});
    }, []);

    return (
        userJobs && userJobs.map((job) => <JobCard job={job} key={job._id} />)
    )
}

const mapStateToProps = (state) => ({
  job: state.job,
  user: state.user
})

export default connect(mapStateToProps, { getJobs, getJobsByIdArray })(MyRequestedJobList);