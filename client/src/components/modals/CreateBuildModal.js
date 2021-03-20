import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { addBuild } from '../../actions/buildActions';
import { getJobs } from '../../actions/jobActions';
import BuildQuantityForm from './BuildQuantityForm';

import M from 'materialize-css';

const CreateBuildModal = ({user: {user}, job: {jobs}, addBuild, getJobs}) => {
  
  //const jobMap = new Map();
  
  useEffect(() => {
    M.AutoInit();
    getJobs({});
    jobs.forEach((job) => {
      jobMap.set(job._id, job);
    });
  },[]);

  const [jobMap, setJobMap] = useState(new Map());
  const [prevJobState, setPrevJobState] = useState([]);
  const [buildForm, setBuildForm] = useState({
    associatedJobs: [],
    partsBuilding: [],
    material: '',
    resolution: '',
    dateStarted: '',
    dateDelivered: '',
    estPrintTime: '',
    status: '',
    projects: [],
    buildFileName: '',
    buildFilePath: '',
    operators: []
  });

  const handleQuantityChange = (jobID, partName, buildQuantity) => {

    //update the jobMap, which will be used to update the job in the database
    copyObj = jobMap.get(jobID);
    copyObj.requestedParts.forEach((part) => {
      if(part.name === partName){
        part.building += buildQuantity;
        part.remaining -= buildQuantity;
      }
    });
    jobMap.set(jobID, copyObj);
  }

  const updateAndCompareJobs = () => { //read the DB before writing
    setPrevJobState(jobs);
    getJobs({});
    prevJobState.forEach
  }

  const onSubmit = () => {

  }

  //update the build
  

  return (
    <div>
    {/*select from available jobs that haven't yet been completed*/}
    <div id='buildModal'className='modal modal-fixed-footer'>
      <div className="modal-content">
        {/* create a select dropdown with all of the jobs that have yet to be completed */}
        {jobs.Map((job, index) => {
          <BuildQuantityForm job={job} />
        })}
      
      </div>
    </div>  
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
  job: state.job,
});

export default connect(mapStateToProps, {addBuild, getJobs})(CreateBuildModal);