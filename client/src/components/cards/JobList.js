import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { getJobs } from '../../actions/jobActions';
import JobCard from './JobCard';

export const JobList = ({ job: { jobs }, user: { user }, getJobs }) => {
    useEffect(() => {
        console.log("user is: ");
        console.log(user);
        getJobs({});
    }, []);

    return (
        user.requestedJobs.map((jobEntry) => <JobCard job={jobEntry} key={jobEntry._id} />)
    )
}

const mapStateToProps = (state) => ({
  job: state.job,
  user: state.user
})

export default connect(mapStateToProps, { getJobs })(JobList);