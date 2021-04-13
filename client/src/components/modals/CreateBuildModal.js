import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import { addBuild } from '../../actions/buildActions';
import { getJobsByIdArray, updateJob } from '../../actions/jobActions';
import BuildQuantityForm from './BuildQuantityForm';

import M from 'materialize-css';
import { compare } from 'bcrypt';

const CreateBuildModal = ({user: {user}, job: {userJobs}, addBuild, getJobsByIdArray}) => {
  
  const [jobMap, setJobMap] = useState(new Map()); //jobMap will keep track of build quantities for each job
  const [buildState, setBuildState] = useState({
    upToDate: true,
  });
  useEffect(() => {
    M.AutoInit();
    getJobsByIdArray([...user.jobQueue]);
    let jobArr = userJobs.map((job) => [job._id, job]);
    setJobMap(new Map(jobArr));
  },[buildState.upToDate]);

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

  const {material, resolution, dateStarted, dateDelivered, estPrintTime, status, buildFileName, buildFilePath} = buildForm;

  const onChange = (e) => {
    setBuildForm({
      ...buildForm,
      [e.target.name]: e.target.value,
    })
  }
  const handleQuantityChange = (jobID, partBuilding, buildQuantity) => {

    //update the jobMap, which will be used to update the job in the database
    let jobRef = jobMap.get(jobID);
    jobRef.requestedParts.forEach((part) => {
      if(part.name === partBuilding){
        part.building += buildQuantity;
        part.remaining -= buildQuantity;
      }
    });
    //setJobMap((prev) => new Map([...prev, [jobID, copyObj]]));
  }

  const jobsAreUpToDate = async (updatedJobs) => { //read the DB before writing, comparing the lastUpdated fields of the jobs held therein to the ones being sent for update
    const IDs = updatedJobs.map((job) => job._id); //get the IDs of the jobs to compare
    const jobsToUpdate = await axios.get('/api/jobs/multipleJobsById', { params: { IDs } }); //get the jobs from the database
    
    //next, compare the lastUpdated field of the jobs currently held to the ones from the database to check if they are up-to-date
    let upToDate = true;
    jobsToUpdate.forEach((job) => {
      let dbDate = new Date(job.lastUpdated);
      let compDate = new Date(jobMap.get(job._id).lastUpdated);
      if(dbDate.getTime !== compDate.getTime)
        upToDate = false;
        setBuildState({ 
          ...buildState,
          upToDate: false,
        });
    });
    if(upToDate === true && buildState.upToDate === false)
      setBuildState({
        ...buildState,
        upToDate: true,
      });
    return upToDate;
  }

  const onSubmit = async () => { //If the jobs are up to date, post the build to the database and update the associated jobs
    
  }

  //update the build
  

  return (
    <div>
      {/*select from available jobs that haven't yet been completed*/}
      <div id='buildModal'className='modal modal-fixed-footer'>
        <div className="modal-content">
          {buildState.upToDate === false ? 
            <div>
              One or more jobs are not up to date. Please try again.
            </div>
            :
            <div>
              {/* create a select dropdown with all of the jobs that have yet to be completed */}
              {userJobs.length === 0 ? <div>Please accept jobs to start a build!</div> : userJobs.Map((job, index) => {
                <BuildQuantityForm job={job} id={index} handleQuantityChange={handleQuantityChange}/>
              })}
              <div className="row">
                <div className="col s6">
                  <div className="input-field">
                    <input 
                      type="text" 
                      name="material"
                      value={material}
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className="col s6">
                  <div className="input-field">
                    <input 
                      type="text" 
                      name="resolution"
                      value={resolution}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
        <div class="modal-footer">

          <button type='submit' style={{margin: '10px'}} className="btn blue modal-close" onClick={onSubmit}>Submit<i className="material-icons right">send</i>
          </button>
        </div>
      </div>  
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
  job: state.userJobs,
});

export default connect(mapStateToProps, {addBuild, getJobsByIdArray})(CreateBuildModal);