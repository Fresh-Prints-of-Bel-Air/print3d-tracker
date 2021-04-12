import React, { useEffect, useState } from 'react'
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/authActions';
import JobCard from './JobCard';
import { deleteJob, setSelectedJobID } from '../../actions/jobActions';
// import 

const MyJobListItem = ({user: { user }, job, jobID, updateUser, deleteJob, setSelectedJobID }) => {
    useEffect(() => {
        M.AutoInit();
      }, []);
    const { job_number, requester, projectName, dateRequested, dateNeeded, completionDate, folderLocation, material, resolution, priority, deliverTo, status, notes, requestedParts, builds } = job;

    const deleteJobHandler = () => {
      // handleCardButtonClick(jobID);
      // setSelectedJobID(jobID);
      console.log("delete button clicked");
      console.log("jobID is: ");
      console.log(jobID);
      deleteJob(jobID);
      updateUser({
        ...user, 
        requestedJobs: [
          ...user.requestedJobs.filter(requestedJobID => requestedJobID != jobID)
        ]
      })
    }

    const editJobHandler = () => {

    }

    return (
        <div className="card" style={{ backgroundColor: '#323840', marginTop: '0px', marginBottom: '15px'}}>
              <div className="card-content hoverable white-text" style={{ padding: 0 }}>
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
                  <div className="col s3"></div>
                  <div className="col s5 align-left blue darken-4">Part</div>
                  <div className="col s1 align-right cyan darken-4">Qty</div>
                  <div className="col s3"></div>
                </div>
                {requestedParts && requestedParts.map((partEntry, index) => { return index % 2 ? ( 
                    <div className="row" key={index} style={{ margin: 0 }}>
                      <div className="col s3"></div>
                      <div className="col s5 align-left blue darken-3">{partEntry.name}</div>
                      <div className="col s1 align-right cyan darken-3">{partEntry.quantity}</div>
                      <div className="col s3"></div>
                    </div>
                  ) : (
                    <div className="row" key={index} style={{ margin: 0 }}>
                      <div className="col s3"></div>
                      <div className="col s5 align-left blue darken-1">{partEntry.name}</div>
                      <div className="col s1 align-right cyan darken-1">{partEntry.quantity}</div>
                      <div className="col s3"></div>
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
                    Needed by:
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
              <div className="card-action white-text" style={{marginBottom: '0px', padding: '8px'}}>
                    <div className="row" style={{marginBottom: '0px'}}>
                        <div className="row center" style={{marginBottom: '0px'}}>
                            <div className="col s4">
                                <button className="btn-small teal" style={{margin: '5px'}} type="submit" 
                                    onClick={editJobHandler}>
                                    <i class="large material-icons left">edit</i>Edit
                                </button>
                            </div>
                            <div className="col s4"></div>
                            <div className="col s4">
                                <div>
                                    <a className="btn-small teal truncate modal-trigger" style={{margin: '5px'}} 
                                        href={`#myJobListModal${job_number}`}>
                                        <i class="small material-icons left">delete_forever</i>Delete
                                    </a>
                                    <div id={`myJobListModal${job_number}`} className="modal">
                                      <div className="modal-content grey darken-3">
                                          <h5>Are you sure you want to delete Job {job_number}?</h5>
                                      </div>
                                      <div className="modal-footer grey darken-3">
                                          <a href="#!" className="modal-close green btn-flat" onClick={deleteJobHandler}>Yes</a>
                                          <a href="#!" className="modal-close red btn-flat">No</a>
                                      </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { updateUser, deleteJob, setSelectedJobID })(MyJobListItem);