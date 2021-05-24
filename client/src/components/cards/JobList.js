import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { getJobs } from '../../actions/jobActions';
import { getJobsByIdArray } from '../../actions/jobActions';
import JobCard from './JobCard';
import JobQueueItem from './JobQueueItem';

// The list of non-completed job requests, 
// shown in the left column of both Operator and Engineer views
// in Operator view, shows all jobs
// in Engineer view, shows all jobs except the user's requested jobs

export const JobList = ({ job: { jobs }, user: { user }, getJobs }) => {
    
    //getJobs({});

    const checkIfJobAccepted = (jobID) => {
      let isAccepted = false;
      user.jobQueue.forEach((jobQueueItemID) => { 
        // console.log("jobQueueItemID");
        // console.log(jobQueueItemID);
        // console.log("jobID");
        // console.log(jobID);
        if (jobQueueItemID == jobID) {
          //console.log("true");
          //console.log(`end check for ${jobID}`);
          isAccepted = true;
        } else {
          //console.log("false");
        }
      });
      //console.log(`end check for ${jobID} (FALSE)`);
      return isAccepted;
    }

    useEffect(() => {
        getJobs({}); //TODO: filter out cancelled and complete
        console.log("Jobqueue useEffect called");
        //jobs.forEach((job) => console.log(job));
    }, []);
    return ( // in Operator view, shows all jobs... with accept job button
            // in Engineer view, shows all jobs except the user's requested jobs
         user.preferredView === 'Operator'? 
         jobs.filter((job) => checkIfJobAccepted(job._id) == false).map((jobEntry) => <JobCard job={jobEntry} key={jobEntry._id}/>) 
         : 
         jobs.filter((job) => job.requesterId !== user._id).map((jobEntry) => <JobCard job={jobEntry} key={jobEntry._id}/>)
    )
}

const mapStateToProps = (state) => ({
  job: state.job,
  user: state.user
})

export default connect(mapStateToProps, {getJobs})(JobList);


