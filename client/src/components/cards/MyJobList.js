import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getJobs } from '../../actions/jobActions';
import { getJobsByIdArray } from '../../actions/jobActions';
import JobCard from './JobCard';
import MyJobListItem from './MyJobListItem';
import M from 'materialize-css/dist/js/materialize.min.js';
// the list of the user's requested jobs

export const MyJobList = ({ job: { jobs, userJobs }, user: { user }, getJobs, getJobsByIdArray }) => {
    useEffect(() => {
        M.AutoInit();
        console.log("user is: ");
        console.log(user);
        console.log("User's requested-job IDs:");
        console.log(user.requestedJobs);
        getJobsByIdArray(user.requestedJobs);
        //getJobs({});
    }, []);

    const [jobIdForModal, setJobIdForModal] = useState(0);

    const handleCardButtonClick = (cardJobId) => {
        setJobIdForModal(cardJobId);
    }

    return (
        <div>
            {userJobs && userJobs.map((job) => <MyJobListItem job={job} key={job._id} jobID={job._id} handleCardButtonClick={handleCardButtonClick}/>)}
            
        </div>
        
    )
}

const mapStateToProps = (state) => ({
  job: state.job,
  user: state.user
})

export default connect(mapStateToProps, { getJobs, getJobsByIdArray })(MyJobList);