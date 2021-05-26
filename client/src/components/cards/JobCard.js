import React, { useEffect, useState } from 'react'
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/authActions';
import { updateJob } from '../../actions/jobActions';
// import 

const JobCard = ({user: { user }, job, updateUser }) => {
    const [acceptedState, setAcceptedState] = useState({
      accepted: false,
    });

    useEffect(() => {
        M.AutoInit();
      }, []);
    const { job_number, requester, projectName, dateRequested, dateNeeded, completionDate, folderLocation, material, resolution, priority, deliverTo, status, notes, requestedParts, builds } = job;

    const acceptJob = () => {
      setAcceptedState({...acceptedState, accepted: true});
      updateUser({...user, jobQueue: [...user.jobQueue, job._id]});
      //updatejob, adding the user to the job's operators list
      updateJob({...job, acceptingOperators: [...job.acceptingOperators, user._id]});
    }

    return (
        <div className="card hoverable" style={{ backgroundColor: '#323840', marginTop: '0px', marginBottom: '15px'}}>
              <div className="card-content white-text" style={{ padding: 0 }}>
                <div className="row grey darken-3" style={{ margin: 0 }}>
                  <div className="col s1 grey darken-4">
                    #{job_number}
                  </div>
                  <div className="col s2 grey darken-2 center">
                    {dateRequested && dateRequested.split('T')[0]}
                  </div>
                  <div className="col s6 center">
                    Requested By {requester}
                  </div>
                  <div className="col s3 center grey darken-2">
                    STATUS: {status}
                  </div>
                </div>

                <div className="row grey darken-3">
                  <div className="col s3 center truncate">
                    {projectName}
                  </div>
                  <div className="col s6 center grey darken-2">
                    {folderLocation}
                  </div>
                  <div className="col s3 center">
                    PRIORITY: {priority}
                  </div>
                </div>

                <div className="row" style={{ margin: 0 }}>
                  <div className="col s1"></div>
                  <div className="col s4 align-left truncate" style={{ backgroundColor: "#043085"}}>Part</div>
                  <div className="col s2 align-right blue darken-4 truncate">Requested</div> {/* job quantity is the requested amount */}
                  <div className="col s2 align-right teal darken-3 truncate">Remaining</div>
                  <div className="col s2 align-right teal darken-4 truncate">Building</div>
                  
                  <div className="col s1"></div>
                </div>
                {requestedParts && requestedParts.map((partEntry, index) => { return index % 2 ? ( 
                    <div className="row" key={index} style={{ margin: 0 }}>
                      <div className="col s1"></div>
                      <div className="col s4 align-left blue darken-4 truncate">{partEntry.name}</div>
                      <div className="col s2 align-right blue darken-3">{partEntry.quantity}</div>
                      <div className="col s2 align-right cyan darken-3">{partEntry.remaining}</div>
                      <div className="col s2 align-right cyan darken-4">{partEntry.building ? partEntry.building : 0}</div>
                      <div className="col s1"></div>
                    </div>
                  ) : (
                    <div className="row" key={index} style={{ margin: 0 }}>
                      <div className="col s1"></div>
                      <div className="col s4 align-left blue darken-2 truncate">{partEntry.name}</div>
                      <div className="col s2 align-right blue darken-1">{partEntry.quantity}</div>
                      <div className="col s2 align-right cyan darken-1">{partEntry.remaining}</div>
                      <div className="col s2 align-right cyan darken-2">{partEntry.building ? partEntry.building : 0}</div>
                      <div className="col s1"></div>
                    </div>
                  )
                })}

                <div className="row">
                </div>
                
                <div className="row grey darken-2" style={{ margin: 0 }}>
                  <div className="col s1" style={{ padding: 2 }}>
                    
                  </div>
                  <div className="col s3 center grey darken-3">
                    Material:
                  </div>
                  <div className="col s4 center">
                    Needed by {deliverTo}:
                  </div>
                  <div className="col s3 center grey darken-3">
                    Resolution:
                  </div>
                  <div className="col s1" style={{ padding: 2 }}>
                    
                  </div>
                </div>
                <div className="row grey darken-2" style={{ margin: 0 }}>
                  <div className="col s1" style={{ padding: 2 }}>
                    
                  </div>
                  <div className="col s3 center grey darken-3">
                    {material}
                  </div>
                  <div className="col s4 center">
                    {dateNeeded && dateNeeded.split('T')[0]}
                  </div>
                  <div className="col s3 center grey darken-3">
                    {resolution} 
                  </div>
                </div>
                <div className="row center" style={{ margin: 0 }}>
                  <div className="col s12">
                    <strong>NOTE: {notes}</strong>
                  </div>
                </div>
              </div>
              {user.preferredView === 'Operator' && (
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
              )}
        </div>
    )
}
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { updateUser })(JobCard);