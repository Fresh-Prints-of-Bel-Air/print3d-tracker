import React, { useEffect, useState } from 'react'
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/authActions';
import { updateJob } from '../../actions/jobActions';
// import 

const MyBuildItem = ({user: { user }, build, updateUser }) => {
    const [acceptedState, setAcceptedState] = useState({
      accepted: false,
    });

    useEffect(() => {
        M.AutoInit();
        console.log(`build.associatedJobs for build number ${build.build_number}`);
        console.log(build.associatedJobs);
      }, []);
    // const { job_number, requester, projectName, dateRequested, dateNeeded, completionDate, folderLocation, material, resolution, priority, deliverTo, status, notes, requestedParts, builds } = job;

    const { build_number, operators, projects, dateStarted, estPrintTime, completionDate, buildFilePath, buildFileName, material, resolution, associatedJobs, status, log, partsBuilding, builds, deliverTo, notes } = build;

    // const acceptJob = () => {
    //   setAcceptedState({...acceptedState, accepted: true});
    //   updateUser({...user, jobQueue: [...user.jobQueue, job._id]});
    //   //updatejob, adding the user to the job's operators list
    //   updateJob({...job, acceptingOperators: [...job.acceptingOperators, user._id]});
    // }
    
    return (
        <div className="card hoverable" style={{ backgroundColor: '#000065', marginTop: '0px', marginBottom: '15px'}}>
              <div className="card-content white-text" style={{ padding: 0 }}>
                <div className="row" style={{ margin: 0, backgroundColor: '#043085'}}>
                  <div className="col s1" style={{ backgroundColor: '#00003E'}}>
                    #{build_number}
                  </div>
                  <div className="col s2 blue darken-3 center">
                    {dateStarted && dateStarted.split('T')[0]}
                  </div>
                  <div className="col s6 center">
                    Build for jobs: {(associatedJobs && (associatedJobs.length > 0) && associatedJobs[0] && associatedJobs[0].jobNumber) 
                      && associatedJobs.map((jobIDandNumObj) => jobIDandNumObj.jobNumber).join(", ")
                    }
                  </div>
                  <div className="col s3 center blue darken-3">
                    STATUS: {status}
                  </div>
                </div>

                <div className="row" style={{ backgroundColor: '#043085' }}>
                  <div className="col s3 center truncate">
                    {projects.join(", ")}
                  </div>
                  <div className="col s6 center blue darken-3">
                    {buildFilePath}\ {buildFileName}
                  </div>
                  <div className="col s3 center">
                    ETA: {estPrintTime} min
                  </div>
                </div>

                <div className="row" style={{ margin: 0 }}>
                  <div className="col s2"></div>
                  <div className="col s4 align-left grey darken-4 truncate">Part</div>
                  <div className="col s2 align-right grey darken-3 truncate">Building</div> 
                  <div className="col s2 align-right grey darken-4 truncate">Job</div>
                  <div className="col s2"></div>
                </div>
                {partsBuilding && partsBuilding.map((partEntry, index) => { return index % 2 ? ( 
                    <div className="row" key={index} style={{ margin: 0 }}>
                      <div className="col s2"></div>
                      <div className="col s4 align-left grey darken-3 truncate">{partEntry.name}</div>
                      <div className="col s2 align-right grey darken-2">{partEntry.quantity}</div>
                      <div className="col s2 align-right grey darken-3">{partEntry.jobNumber}</div>
                      <div className="col s2"></div>
                    </div>
                  ) : (
                    <div className="row" key={index} style={{ margin: 0 }}>
                      <div className="col s2"></div>
                      <div className="col s4 align-left grey darken-2 truncate">{partEntry.name}</div>
                      <div className="col s2 align-right grey darken-1">{partEntry.quantity}</div>
                      <div className="col s2 align-right grey darken-2">{partEntry.jobNumber}</div>
                      <div className="col s2"></div>
                    </div>
                  )
                })}

                <div className="row">
                </div>
                
                <div className="row teal darken-3" style={{ margin: 0 }}>
                  <div className="col s1" style={{ padding: 2 }}>
                    
                  </div>
                  <div className="col s3 center teal darken-4">
                    Material:
                  </div>
                  <div className="col s4 center">
                    Date Started:
                    {/* Deliver To: {deliverTo ? deliverTo : "Unknown"} */}
                  </div>
                  <div className="col s3 center teal darken-4">
                    Resolution:
                  </div>
                  <div className="col s1" style={{ padding: 2 }}>
                    
                  </div>
                </div>
                <div className="row teal darken-3" style={{ margin: 0 }}>
                  <div className="col s1" style={{ padding: 2 }}>
                    
                  </div>
                  <div className="col s3 center teal darken-4">
                    {material}
                  </div>
                  <div className="col s4 center">
                     {dateStarted && dateStarted.split('T')[0]}
                  </div>
                  <div className="col s3 center teal darken-4">
                    {resolution} 
                  </div>
                </div>
                {/* <div className="row center" style={{ margin: 0 }}>
                  <div className="col s12">
                    <strong>NOTE: {notes}</strong>
                  </div>
                </div> */}
              </div>
              {/* {user.preferredView === 'Operator' && (
                <div className="card-action white-text" style={{marginBottom: '0px', padding: '8px'}}>
                  <div className="row" style={{marginBottom: '0px'}}>
                    <div className="col s4"></div>
                      <div className="col s4"></div>
                      <div className="col s4">
                        {acceptedState.accepted === false ? <button class="btn waves-effect teal waves-light" style={{margin: '5px'}} type="submit" name="action" onClick={acceptJob}>Accept Job
                        <i class="material-icons left">add_box</i>
                        </button> : 
                        <div>
                          <strong>Job Accepted</strong>
                          <i className="material-icons" style={{margin: '3px', marginTop: '5px', paddingTop: '5px'}}>check</i> 
                        </div>
                        } 
                      </div>
                  </div>
                </div>
              )} */}
        </div>
    )
}
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { updateUser })(MyBuildItem);