import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { getJobs } from '../../actions/jobActions';
import JobCard from './JobCard';

export const JobList = ({ job: { jobs }, getJobs }) => {
    useEffect(() => {
        getJobs({});
    }, []);

    return (
        jobs.map((jobEntry) => <JobCard job={jobEntry} key={jobEntry._id} />)
    )
}

const mapStateToProps = (state) => ({
  job: state.job
})

export default connect(mapStateToProps, {getJobs})(JobList);