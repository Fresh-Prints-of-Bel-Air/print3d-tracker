import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import { addBuild } from '../../actions/buildActions';
import { getJobsByIdArray, updateJob } from '../../actions/jobActions';
import Select from 'react-select';
import BuildQuantityForm from './BuildQuantityForm';

import M from 'materialize-css';


const CreateBuildModal = ({user: {user}, job: {userJobQueue}, addBuild, getJobsByIdArray}) => {

  // const [jobMap, setJobMap] = useState(new Map()); 
  const [buildForm, setBuildForm] = useState({
    jobMap: new Map(), //jobMap will keep track of build quantities for each job
    //associatedJobs: [],
    //partsBuilding: [],
    material: '',
    resolution: '',
    dateStarted: '',
    estPrintTime: '',
    status: 'Build File Ready',
    buildFileName: '',
    buildFilePath: '',
    operators: [user.name,"", ""],
    //key: job.id, value: array of part objects (with quantity building)...
    //...used to ensure at least 1 part is being built for a job whose project is added to the project list
    jobPartQuantityMap: new Map((userJobQueue.map((job) => ( 
      [
        job._id, 
        job.requestedParts.map((part) => ({ partName: part.name, quantityBuilding: 0})),
      ]
    ))))
  });


  const [buildState, setBuildState] = useState({
    upToDate: true,
  });

  useEffect(() => {
    getJobsByIdArray(user.jobQueue, "GET_USER_JOB_QUEUE"); // populate the state with the jobs from the user's jobQueue
  },[user]);

  useEffect(() => {
    // making sure jobMap and jobPartQuantityMap are initialized
    // if (buildForm.jobMap.size === 0 || buildForm.jobPartQuantityMap.size === 0) 
      setBuildForm({
        material: '',
        resolution: '',
        dateStarted: '',
        estPrintTime: '',
        status: 'Build File Ready',
        buildFileName: '',
        buildFilePath: '',
        operators: [user.name,"", ""], 
        jobMap: new Map(userJobQueue.map((job) => 
          [
            job._id, 
            {
              ...job, 
              requestedParts: job.requestedParts.map((partObj) => ({...partObj})), 
              //operators: [...job.acceptingOperators]
            }
          ]
        )),
        jobPartQuantityMap: new Map(userJobQueue.map((job) => 
          [
            job._id, 
            job.requestedParts.map((part) => ({ partName: part.name, quantityBuilding: 0}))
          ]
        ))
      })
  },[userJobQueue]);

  useEffect(() => {
    M.AutoInit();

    // console.log("useEffect CreateBuildModal");
    // console.log("userJobQueue");
    // console.log(userJobQueue);
    // console.log("userJobQueue.map((job) => [job._id, job])");
    // console.log(userJobQueue.map((job) => [job._id, job]));

    if(buildState.upToDate === false){ //If the jobs are not up to date with the database, refresh them
      getJobsByIdArray([...user.jobQueue], "GET_USER_JOB_QUEUE");
      setBuildForm({
        ...buildForm, 
        jobMap: new Map(userJobQueue.map((job) => 
          [
            job._id, 
            {
              ...job, 
              requestedParts: job.requestedParts.map((partObj) => ({...partObj})), 
              //operators: [...job.acceptingOperators]
            }
          ])), 
        jobPartQuantityMap: new Map((userJobQueue.map((job) => (
          [ job._id, 
            job.requestedParts.map((part) => ({
              partName: part.name,
              quantityBuilding: 0
            }))
          ]
        ))))
      }); //jobPartQuantityMap needs to be reset because userJobQueue may have changed
      setBuildState({...buildState, upToDate: true});
    }
  },[buildState.upToDate]);

  useEffect(() => {
    console.log('BuildForm was changed. The new state is: ');
    console.log(buildForm);
  },[buildForm]);
  

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
      //associatedJobs: [],
      //partsBuilding: [],
      material: '',
      resolution: '',
      dateStarted: '',
      estPrintTime: '',
      status: 'Build File Ready',
      buildFileName: '',
      buildFilePath: '',
      operators: [user.name,"", ""],
      jobPartQuantityMap: new Map((userJobQueue.map((job) => 
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
    //add partsBuilding based on the jobPartQuantityMap
    console.log(`HandleQuantityChange called. Parameters are:`);
    console.log("JobID");
    console.log(jobID);
    console.log("PartBuilding");
    console.log(partBuilding);
    console.log("BuildQuantity");
    console.log(buildQuantity);
    console.log("userJobQueue");
    console.log(userJobQueue);
    console.log("[...buildForm.jobMap]");
    console.log([...buildForm.jobMap]);
    console.log("jobID");
    console.log(jobID);
    console.log("buildForm.jobMap.get(jobID");
    console.log(buildForm.jobMap.get(jobID));
    
    
    //copyJob is used to update the form state
    let copyJob = JSON.parse(JSON.stringify(buildForm.jobMap.get(jobID)));
    
    
    console.log("copyJob");
    console.log(copyJob);

    //Updates parts remaining when the form field changes

    
    copyJob.requestedParts.forEach((part) => {
      if(part.name === partBuilding){
        part.building += buildQuantity; //Should be +buildQuantity?
        if(part.quantity - part.building <= 0){
          part.remaining = 0;
          //add extra parts
          if(part.building > part.quantity)
            part.extras = part.building - part.quantity; //what about the case where we reduce the amount being built? we need to remove the extras
          console.log("parts remaining is now 0");
        }
        else {
          part.remaining = part.quantity - part.building;
          part.extras = 0;
        }
       }
    });
    //let copyArray = buildForm.jobPartQuantityMap.get(jobID);
    let copyArray = JSON.parse(JSON.stringify(buildForm.jobPartQuantityMap.get(jobID)));
    console.log("copyArray");
    console.log(copyArray);
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
    const jobIdArray = updatedJobs.map((job) => job._id); //get the IDs of the jobs to compare
    console.log("JobsAreUpToDate IDs");
    console.log(jobIdArray);
    const jobsToUpdate = await axios.get('/api/jobs/multipleJobsById', { params: { jobIdArray }}); //get the jobs from the database
    console.log("jobsToUpdate");
    console.log(jobsToUpdate.data);
    console.log("Compare to buildForm jobmap");
    console.log(buildForm.jobMap);
    //add logic to check if the job even still exists in the db
    //next, compare the lastUpdated field of the jobs currently held to the ones from the database to check if they are up-to-date
    let upToDate = true;
    jobsToUpdate.data.forEach((job) => {
      if(job.lastUpdated){
        // console.log("job.lastUpdated");
        // console.log(job.lastUpdated);
        // console.log("jobmap job last updated");
        // console.log(buildForm.jobMap.get(job._id).lastUpdated);
        let dbDate = new Date(job.lastUpdated);
        let compDate = new Date(buildForm.jobMap.get(job._id).lastUpdated);
        // console.log(compDate);
        // console.log(dbDate);
        // console.log("getTime function");
        // console.log(compDate.getTime());
        // console.log(dbDate.getTime());
        if(dbDate.getTime() !== compDate.getTime()){
          alert("One or more jobs is not up to date with our records. Please try again.");
          upToDate = false;
          setBuildState({ 
            ...buildState,
            upToDate: false,
          });
        }
      }
    });
    if(upToDate === true && buildState.upToDate === false)
      setBuildState({
        ...buildState,
        upToDate: true,
      });
    // console.log("Uptodate?");
    // console.log(upToDate);
    return upToDate;
  }

  // checking if there are any parts in the request with quantity greater than 0
  // and alerting the user
  const quantitiesAreEmpty = () => {
    let isEmpty = true;
    buildForm.jobPartQuantityMap.forEach((requestedPartsArr) => {
      requestedPartsArr.forEach((requestedPart) => {
        if (requestedPart.quantityBuilding > 0) isEmpty = false;
      })
    })

    if(isEmpty){
      alert("Please select quantities for parts in the build.");
    }

    return isEmpty;
  } 

  //If the jobs are up to date, post the build to the database and update the associated jobs
  const onSubmit = async () => { 
    
    let associatedJobs = new Map();
    let associatedJobIDs = new Set();
    let partsBuilding = [];
    
    if(jobsAreUpToDate(Array.from(buildForm.jobMap.values())) && !quantitiesAreEmpty()){
      //iterate over the jobPartQuantityMap. Any job having at least 1 part being built is added to associated jobs for the build
      for(let [jobID, partList] of buildForm.jobPartQuantityMap){
        let i;
        for(i = 0; i < partList.length; i++){
          if(partList[i].quantityBuilding > 0){
            let associatedJob = buildForm.jobMap.get(jobID);
            associatedJobs.set(jobID, { _id: jobID, jobNumber: associatedJob.job_number}); //change to _id: jobID ?
            // associatedJobs.push({ jobID, jobNumber: associatedJob.job_number});
            associatedJobIDs.add(jobID);
            partsBuilding.push({
              name: partList[i].partName, 
              quantity: partList[i].quantityBuilding, 
              jobNumber: associatedJob.job_number 
            }); 
          }
        }
      }
      //create an array of jobs from jobMap containing only jobs that have a part being built for them in the form
      const associatedJobIDsArray = Array.from(associatedJobIDs); // associatedJobIDs is a Set 
      let jobsToUpdateArray = Array.from(buildForm.jobMap.values()).filter((job) => associatedJobIDsArray.includes(job._id));
      
      //send the buildForm to be posted to the database, minus the map data structures
      const {jobMap, jobPartQuantityMap, ...buildToPost} = buildForm;
      const operators = [...buildForm.operators];
      
      addBuild(
        { //Build Object
          ...buildToPost,
          operators, 
          associatedJobs: Array.from(associatedJobs.values()), // associatedJobs is a Map
          partsBuilding 
        }, 
        jobsToUpdateArray, 
        { //User Object
          ...user,
          lastBuild: buildToPost
        }
      );

      //clearForm();

    }
    else {
      console.log('Jobs are not up to date');
    }
    
    console.log('buildForm onSubmit');
    console.log(buildForm);
    
  }


  //update the build
  

  return (
    <div id='buildModal' className='modal modal-fixed-footer'>
      <div className="modal-content">
        <h4 className="center">Create Build</h4>
        {buildState.upToDate === false ? 
          <div>
            One or more jobs are not up to date. Please try again.
          </div>
          :
          <div>
            {/* create a select dropdown with all of the jobs that have yet to be completed */}
              {( !userJobQueue || userJobQueue.length === 0 )? <div>Please accept jobs to start a build!</div> : userJobQueue.map((job, index) => (
                <BuildQuantityForm job={job} key={index} handleQuantityChange={handleQuantityChange}/>)
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
                          readOnly
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
                    Estimated Print Time(Hours):
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              Input up to two additional operators: 
            </div>
            <div className="row">
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
    {buildState.upToDate === true &&
      <div className="modal-footer">
          <button style={{margin: '10px'}} className="btn blue" type="reset" name="clear" onClick={clearForm}>Clear<i className="material-icons right">clear</i>
          </button>
          {user.lastBuild && 
            <button style={{margin: '10px'}} className="btn blue" 
                    onClick={() => {  setBuildForm({jobMap: buildForm.jobMap, jobPartQuantityMap: buildForm.jobPartQuantityMap, ...user.lastBuild}) }}>
                Refill<i className="material-icons right">format_color_fill</i>
            </button>
          }
          <button type='submit' style={{margin: '10px'}} className="btn blue modal-close" onClick={onSubmit}>Submit<i className="material-icons right">send</i>
          </button>
      </div>
    }
    </div>  
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
  job: state.job,
});

export default connect(mapStateToProps, {addBuild, getJobsByIdArray,})(CreateBuildModal);
