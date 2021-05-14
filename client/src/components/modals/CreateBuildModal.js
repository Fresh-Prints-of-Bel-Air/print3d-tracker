import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import { addBuild } from '../../actions/buildActions';
import { getJobsByIdArray, updateJob } from '../../actions/jobActions';
import Select from 'react-select';
import BuildQuantityForm from './BuildQuantityForm';

import M from 'materialize-css';


const CreateBuildModal = ({user: {user}, job: {userJobs}, addBuild, getJobsByIdArray}) => {
  
  // const [jobMap, setJobMap] = useState(new Map()); 
  const [buildForm, setBuildForm] = useState({
    jobMap: new Map(), //jobMap will keep track of build quantities for each job
    associatedJobs: [],
    partsBuilding: [],
    material: '',
    resolution: '',
    dateStarted: '',
    estPrintTime: '',
    status: 'Build File Ready',
    projects: [],
    buildFileName: '',
    buildFilePath: '',
    operators: [user.name,"", ""],
    jobPartQuantityMap: new Map((userJobs.map((job) => (
      [
        job._id, 
        job.requestedParts.map((part) => ({ partName: part.name, quantityBuilding: 0}))
      ]
    ))))
  });
//key: job.id, value: array of part objects (with quantity building)...used to ensure at least 1 part is being built for a job whose project is added to the project list

  const [buildState, setBuildState] = useState({
    upToDate: true,
  });

  useEffect(() => {
    // making sure jobMap and jobPartQuantityMap are initialized
    if (buildForm.jobMap.size === 0 || buildForm.jobPartQuantityMap.size === 0) 
      setBuildForm({
        ...buildForm, 
        jobMap: new Map(userJobs.map((job) => [job._id, job])),
        jobPartQuantityMap: new Map((userJobs.map((job) => (
          [
            job._id, 
            job.requestedParts.map((part) => ({ partName: part.name, quantityBuilding: 0}))
          ]
        ))))
      })
  },[userJobs]);

  useEffect(() => {
    M.AutoInit();

    console.log("useEffect CreateBuildModal");
    console.log("userJobs");
    console.log(userJobs);
    console.log("userJobs.map((job) => [job._id, job])");
    console.log(userJobs.map((job) => [job._id, job]));

    if(buildState.upToDate === false){ //If the jobs are not up to date with the database, refresh them
      getJobsByIdArray([...user.jobQueue]);
      let jobArr = userJobs.map((job) => [job._id, job]);
      setBuildForm({
        ...buildForm, 
        jobMap: new Map(jobArr), 
        jobPartQuantityMap: new Map((userJobs.map((job) => (
          [ job._id, 
            job.requestedParts.map((part) => ({
              partName: part.name,
              quantityBuilding: 0
            }))
          ]
        ))))
      }); //jobPartQuantityMap needs to be reset because userJobs may have changed
    }
  },[buildState.upToDate]);

  

  const {material, resolution, dateStarted, dateDelivered, estPrintTime, status, buildFileName, buildFilePath} = buildForm;

  const onChange = (e) => {
    if(e.target.name === 'addOperator1'){
      setBuildForm({
        ...buildForm,
        operators: [user.name, e.target.value, buildForm.operators[2]],
      });
    }
    else if(e.target.name === 'addOperator2'){
      setBuildForm({
        ...buildForm,
        operators: [user.name, buildForm.operators[1], e.target.value]
      });
    }
    else if(e.target.name === 'buildFileName'){
      console.log(e.target.files);
      if(e.target.files.length > 0){
        setBuildForm({
          ...buildForm,
          buildFileName: [...e.target.files][0].name,
        });
      }
    }
    else{
      setBuildForm({
        ...buildForm,
        [e.target.name]: e.target.value,
      });
    }
  }

  const clearForm = () => {
    setBuildForm({
      jobMap: new Map(),
      associatedJobs: [],
      partsBuilding: [],
      material: '',
      resolution: '',
      dateStarted: '',
      estPrintTime: '',
      status: 'Build File Ready',
      projects: [],
      buildFileName: '',
      buildFilePath: '',
      operators: [user.name,"", ""],
      jobPartQuantityMap: new Map((userJobs.map((job) => 
        ([
          job._id, 
          job.requestedParts.map((part) => ({ partName: part.name, quantityBuilding: 0}))
        ])
      )))
    });
  }

  const handleQuantityChange = (jobID, partBuilding, buildQuantity) => {

    //update the jobMap, which will be used to update the job in the database
    //also update the jobPartQuantityMap, which is used to check if a given job actually has any parts being built for it (so we can add it's associated project to the build)
    console.log("userJobs");
    console.log(userJobs);
    console.log("[...buildForm.jobMap]");
    console.log([...buildForm.jobMap]);
    console.log("jobID");
    console.log(jobID);
    console.log("buildForm.jobMap.get(jobID");
    console.log(buildForm.jobMap.get(jobID));
    let copyJob = {...buildForm.jobMap.get(jobID)};
    console.log("copyJob");
    console.log(copyJob);

    // ! this being done every time anything changes in the quantity form
    copyJob.requestedParts.forEach((part) => {
      if(part.name === partBuilding){
        part.building += buildQuantity;
        part.remaining -= buildQuantity;
      }
    });
    let copyArray = buildForm.jobPartQuantityMap.get(jobID);
    copyArray.forEach((part) => {
      if(part.partName === partBuilding)
       part.quantityBuilding = buildQuantity;
    });
    setBuildForm((prev) => ({...buildForm, 
      jobMap: new Map([...prev.jobMap, [jobID, copyJob]]),
      jobPartQuantityMap: new Map([...prev.jobPartQuantityMap, [jobID, copyArray]])
    })); 
  }

  const jobsAreUpToDate = async (updatedJobs) => { //read the DB before writing, comparing the lastUpdated fields of the jobs held therein to the ones being sent for update
    const IDs = updatedJobs.map((job) => job._id); //get the IDs of the jobs to compare
    const jobsToUpdate = await axios.get('/api/jobs/multipleJobsById', { params: { IDs } }); //get the jobs from the database
    //add logic to check if the job even still exists in the db
    //next, compare the lastUpdated field of the jobs currently held to the ones from the database to check if they are up-to-date
    let upToDate = true;
    jobsToUpdate.forEach((job) => {
      let dbDate = new Date(job.lastUpdated);
      let compDate = new Date(buildForm.jobMap.get(job._id).lastUpdated);
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
    console.log('derp');
  }

  //update the build
  

  return (
    <div>
      {/*select from available jobs that haven't yet been completed*/}
      <div id='buildModal'className='modal modal-fixed-footer'>
        <div className="modal-content">
          <h4 className="">Create Build</h4>
          {buildState.upToDate === false ? 
            <div>
              One or more jobs are not up to date. Please try again.
            </div>
            :
            <div>
              {/* create a select dropdown with all of the jobs that have yet to be completed */}
               {(userJobs.length === 0 || !userJobs )? <div>Please accept jobs to start a build!</div> : userJobs.map((job, index) => (
                <BuildQuantityForm job={job} id={index} handleQuantityChange={handleQuantityChange}/>)
              )} 
              <div className="row">
              <div className='col s6'>
                <div className="file-field input-field">
                    <div className="btn blue" name="Select Files">
                        <span>Select Build File</span>
                        <input type="file" name="buildFileName"
                            onChange={onChange}/>
                    </div>
                    <div className="file-path-wrapper">
                        <input 
                            className="file-path validate"
                            type="text"
                            placeholder="Upload a build file"
                            value={buildFileName} 
                        />
                    </div>
                </div>
                </div>
                <div className="col s6">
                  <div className="input-field">
                    <input 
                    type="text" 
                    name="buildFilePath" 
                    value={buildForm.buildFilePath} 
                    onChange={onChange}
                    />
                    <label htmlFor="buildFilePath" className="active">
                      Build File Path:
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col s6">
                  <div className="input-field">
                    <input 
                      type="text" 
                      name="material"
                      value={material}
                      onChange={onChange}
                    />
                    <label htmlFor="material" className="active">
                        Material:
                    </label>
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
                  <label htmlFor="resolution" className="active">
                      Resolution:
                  </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col s6">
                  <div className="input-field">
                    <input 
                    type="date" 
                    name="dateStarted"
                    value={dateStarted}
                    onChange={onChange} 
                    />
                    <label htmlFor="dateStarted" className="active">
                      Date Started:
                    </label>
                  </div>
                </div>
                <div className="col s6">
                  <div className="input-field">
                    <input 
                    type="text" 
                    name="estPrintTime" 
                    value={estPrintTime}
                    onChange={onChange}
                    />
                    <label htmlFor="estPrintTime" className="active">
                      Estimated Print Time(Minutes):
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                Input up to two additional operators: 
                <div className="col s6">
                  <div className="input-field">
                    <input 
                    type="text" 
                    name="addOperator1" 
                    value={buildForm.operators[1]} 
                    onChange={onChange}
                    />
                  <label htmlFor="addOperator1" className="active">
                      Additional Operator 1:
                  </label>
                  </div>
                </div>
                <div className="col s6">
                  <div className="input-field">
                    <input 
                    type="text" 
                    name="addOperator2" 
                    value={buildForm.operators[2]} 
                    onChange={onChange}
                    />
                  <label htmlFor="addOperator2" className="active">
                      Additional Operator 2:
                  </label>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
        <div class="modal-footer">
          <button style={{margin: '10px'}} className="btn blue" type="reset" name="clear" onClick={clearForm}>Clear<i className="material-icons right">clear</i>
          </button>
          {user.lastBuild && 
            <button style={{margin: '10px'}} className="btn blue" 
                    onClick={() => {  setBuildForm(user.lastBuild) }}>
                Refill<i className="material-icons right">format_color_fill</i>
            </button>
          }
          <button type='submit' style={{margin: '10px'}} className="btn blue modal-close" onClick={onSubmit}>Submit<i className="material-icons right">send</i>
          </button>
        </div>
      </div>  
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
  job: state.job,
});

export default connect(mapStateToProps, {addBuild, getJobsByIdArray})(CreateBuildModal);
