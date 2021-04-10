import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { getJobsByIdArray } from '../../actions/jobActions';
import JobQueueItem from './JobQueueItem';

// the list of the jobs in the user's jobQueue (shown in operator view, right)

export const JobQueue = ({ job: { userJobs }, user: { user }, getJobsByIdArray }) => {
    useEffect(() => {
        console.log("user is: ");
        console.log(user);
        console.log("User's requested-job IDs:");
        console.log(user.jobQueue);
        getJobsByIdArray(user.jobQueue);
    }, [user]);

    return (
        userJobs && userJobs.map((job) => <JobQueueItem job={job} key={job._id} />)
    )
}

const mapStateToProps = (state) => ({
  job: state.job,
  user: state.user
})

export default connect(mapStateToProps, { getJobsByIdArray })(JobQueue);