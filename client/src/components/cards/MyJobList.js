import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getJobs } from '../../actions/jobActions';
import { getJobsByIdArray } from '../../actions/jobActions';
import JobCard from './JobCard';
import MyJobListItem from './MyJobListItem';
import M from 'materialize-css/dist/js/materialize.min.js';

export const MyJobList = ({ job: { userRequestedJobs }, user: { user }, getJobsByIdArray }) => {
    // useEffect(() => {
    //     M.AutoInit();
    //     console.log("user is: ");
    //     console.log(user);
    //     console.log("User's requested-job IDs:");
    //     console.log(user.requestedJobs);
    //     // getJobsByIdArray(user.requestedJobs);
    //     //getJobs({});
    //     console.log("jobs contains: ");
    //     console.log(jobs);
    // }, [jobs]);

    useEffect(() => {
        M.AutoInit();
        getJobsByIdArray(user.requestedJobs, 'GET_USER_REQUESTED_JOBS');
    }, [user]);

    useEffect(() => {
        console.log('userRequestedJobs change');
        console.log(userRequestedJobs);
    }, [userRequestedJobs]);

    // const [jobIdForModal, setJobIdForModal] = useState(0);

    // const handleCardButtonClick = (cardJobId) => {
    //     setJobIdForModal(cardJobId);
    // }

    return (
        <div>
            {userRequestedJobs && userRequestedJobs.map((job) => <MyJobListItem jobData={job} key={job._id} jobID={job._id}/>)}
        </div>
        
    )
}

const mapStateToProps = (state) => ({
  job: state.job,
  user: state.user
})

export default connect(mapStateToProps, { getJobs, getJobsByIdArray })(MyJobList);