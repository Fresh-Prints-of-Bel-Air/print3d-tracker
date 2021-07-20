import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { getJobs } from '../../actions/jobActions';
import { getJobsByIdArray } from '../../actions/jobActions';
import JobCard from './JobCard';
import JobQueueItem from './JobQueueItem';

// The list of non-completed job requests, 
// shown in the left column of the Operator view, and the right column of the Engineer view
// in Operator view, shows all jobs
// in Engineer view, shows all jobs except the user's requested jobs

export const JobList = ({ job: { jobs }, user: { user }, getJobs }) => {


    useEffect(() => {
        getJobs({ filterType: "jobList" }); // meaning we want the jobs with the Accepted and Requested status
    }, [user]);
    return ( // in Operator view, shows all jobs that haven't been accepted by the user
                //... those job cards have accept job buttons
            // in Engineer view, shows all non-complete requested jobs except the user's requested jobs
         user.preferredView === 'Operator' ? 
         jobs.filter((job) => (!user.jobQueue.includes(job._id))).map((jobEntry) => <JobCard job={jobEntry} key={jobEntry._id}/>) 
         : 
         jobs.filter((job) => job.requesterId !== user._id).map((jobEntry) => <JobCard job={jobEntry} key={jobEntry._id}/>)
    )
}

const mapStateToProps = (state) => ({
  job: state.job,
  user: state.user
})

export default connect(mapStateToProps, {getJobs})(JobList);


