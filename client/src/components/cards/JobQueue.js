import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { getJobsByIdArray } from '../../actions/jobActions';
import JobQueueItem from './JobQueueItem';

// the list of the jobs in the user's jobQueue (shown in operator view, right)

export const JobQueue = ({ job: { userJobQueue }, user: { user }, getJobsByIdArray }) => {
    useEffect(() => {
        getJobsByIdArray(user.jobQueue, 'GET_USER_JOB_QUEUE'); // put into the CreateBuildModal useEffect
    }, [user]);

    return (
        userJobQueue && userJobQueue.map((job) => <JobQueueItem job={job} key={job._id} />)
    )
}

const mapStateToProps = (state) => ({
  job: state.job,
  user: state.user
})

export default connect(mapStateToProps, { getJobsByIdArray })(JobQueue);