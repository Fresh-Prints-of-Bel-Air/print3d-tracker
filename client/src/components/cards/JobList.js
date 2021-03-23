import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { getJobs } from '../../actions/jobActions';
import { getUserRequestedJobs } from '../../actions/jobActions';
import JobCard from './JobCard';

export const JobList = ({ job: { jobs, userJobs }, user: { user }, getJobs, getUserRequestedJobs }) => {
    useEffect(() => {
        console.log("user is: ");
        console.log(user);
        getUserRequestedJobs(user.requestedJobs);
        getJobs({});
    }, []);

    return (
        userJobs.map((job) => <JobCard job={job} key={job._id} />)
    )
}

const mapStateToProps = (state) => ({
  job: state.job,
  user: state.user
})

export default connect(mapStateToProps, { getJobs, getUserRequestedJobs})(JobList);