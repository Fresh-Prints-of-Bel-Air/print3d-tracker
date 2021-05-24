import React, { useEffect, useState } from 'react'
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/authActions';
import JobCard from './JobCard';
import { deleteJob, setSelectedJobID } from '../../actions/jobActions';
import DeleteJobModal from '../modals/DeleteJobModal';
import EditJobModal from '../modals/EditJobModal';
// import 

const MyJobListItem = ({user: { user }, jobData, jobID, updateUser, deleteJob, setSelectedJobID }) => {
    useEffect(() => {
        M.AutoInit();
      }, []);
    const { job_number, requester, projectName, dateRequested, dateNeeded, completionDate, folderLocation, 
      material, resolution, priority, deliverTo, status, notes, requestedParts, builds } = jobData;

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
                  <div className="col s2 align-right blue darken-4 truncate">Quantity</div>
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
              <div className="card-action white-text" style={{marginBottom: '0px', padding: '8px'}}>
                    <div className="row" style={{marginBottom: '0px'}}>
                        <div className="row center" style={{marginBottom: '0px'}}>
                            <div className="col s4">
                                <EditJobModal jobNumber={job_number} jobID={jobID} jobData={jobData}/>
                            </div>
                            <div className="col s4"></div>
                            <div className="col s4">
                                <DeleteJobModal jobNumber={job_number} jobID={jobID}/>
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