// import React, { useEffect, useState } from 'react'
// import { connect } from 'react-redux';
// import { addBuild } from '../../actions/buildActions';
// import { getJobsByIdArray } from '../../actions/jobActions';
// import BuildQuantityForm from './BuildQuantityForm';

// import M from 'materialize-css';

// const CreateBuildModal = ({user: {user}, job: {userJobs}, addBuild, getJobsByIdArray}) => {
  
//   //const jobMap = new Map();
  
//   useEffect(() => {
//     M.AutoInit();
//     getJobsByIdArray([...user.jobQueue]);
//     setJobMap(new Map());
//     userJobs.forEach((job) => {
//       setJobMap((job) => {
        
//       })
//       //(job._id, job);
//     });
//   });  //infinite loop? 

//   const [jobMap, setJobMap] = useState(new Map());
//   const [prevJobState, setPrevJobState] = useState({});
//   const [buildForm, setBuildForm] = useState({
//     associatedJobs: [],
//     partsBuilding: [],
//     material: '',
//     resolution: '',
//     dateStarted: '',
//     dateDelivered: '',
//     estPrintTime: '',
//     status: '',
//     projects: [],
//     buildFileName: '',
//     buildFilePath: '',
//     operators: []
//   });

//   const handleQuantityChange = (jobID, partName, buildQuantity) => {

//     //update the jobMap, which will be used to update the job in the database
//     copyObj = jobMap.get(jobID);
//     copyObj.requestedParts.forEach((part) => {
//       if(part.name === partName){
//         part.building += buildQuantity;
//         part.remaining -= buildQuantity;
//       }
//     });
//     jobMap.set(jobID, copyObj);
//   }

//   const updateAndCompareJobs = () => { //read the DB before writing
//     setPrevJobState(jobs);
//     getJobs({});
//     prevJobState.forEach
//   }

//   const onSubmit = () => {

//   }

//   //update the build
  

//   return (
//     <div>
//     {/*select from available jobs that haven't yet been completed*/}
//     <div id='buildModal'className='modal modal-fixed-footer'>
//       <div className="modal-content">
//         {/* create a select dropdown with all of the jobs that have yet to be completed */}
//         {userJobs.length === 0 ? <div>Please accept jobs to start a build!</div> : userJobs.Map((job, index) => {
//           <BuildQuantityForm job={job} id={index}/>
//         })}
//       </div>
//     </div>  
//     </div>
//   )
// }

// const mapStateToProps = (state) => ({
//   user: state.user,
//   job: state.userJobs,
// });

// export default connect(mapStateToProps, {addBuild, getJobsByIdArray})(CreateBuildModal);