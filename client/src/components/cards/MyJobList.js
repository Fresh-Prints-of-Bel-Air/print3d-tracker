import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getJobs } from '../../actions/jobActions';
import { getJobsByIdArray } from '../../actions/jobActions';
import JobCard from './JobCard';
import MyJobListItem from './MyJobListItem';
import M from 'materialize-css/dist/js/materialize.min.js';
// userJobs the list of the user's requested jobs, rename

export const MyJobList = ({ job: { userJobs }, user: { user }, getJobsByIdArray }) => {
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
        getJobsByIdArray(user.requestedJobs);
    }, [user]);

    // const [jobIdForModal, setJobIdForModal] = useState(0);

    // const handleCardButtonClick = (cardJobId) => {
    //     setJobIdForModal(cardJobId);
    // }

    return (
        <div>
            {userJobs && userJobs.map((job) => <MyJobListItem jobData={job} key={job._id} jobID={job._id}/>)}
        </div>
        
    )
}

const mapStateToProps = (state) => ({
  job: state.job,
  user: state.user
})

export default connect(mapStateToProps, { getJobs, getJobsByIdArray })(MyJobList);