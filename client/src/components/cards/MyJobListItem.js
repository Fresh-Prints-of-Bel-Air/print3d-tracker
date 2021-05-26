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

    const colors = {
      blueD5: ["#043085", '#153575',"#243A65"],
      blueD4: ['#0d47a1', "#204C8D", "#324F7B"],
      blueD3: ['#1565c0', "#2B67AB", "#406896"],
      blueD2: ['#1976d2', '#3075BB', "#4875A3"],
      blueD1: ['#1e88e5', "#3887CC", "#5185B3"],
      tealD4: ['#004d40', "#0A4339", "#133933"],
      tealD3: ['#00695c', "#0D5E54", "#1B504A"],
      cyanD4: ["#006064", "#0D5759", "#1A4B4D"],
      cyanD3: ["#00838f", "#12747D", "#24656B"],
      cyanD2: ["#0097a7", "#158793", "#2A767E"],
      cyanD1: ["#00acc1", "#1899AA", "#308691"]
    }
    
    const {blueD5, blueD4, blueD3, blueD2, blueD1, tealD4, tealD3, cyanD4, cyanD3, cyanD2, cyanD1} = colors;

    // enum set up so saturation value lines up with array index of color properties of colors
    const satEnum = Object.freeze({ FULL: 0, HIGH: 1, MEDIUM: 2 }); 
    const { FULL, HIGH, MEDIUM } = satEnum;  
    const SAT = HIGH; // sets level of saturation

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
            <div className="col s4 align-left truncate" style={{ backgroundColor: blueD5[SAT]}}>Part</div>
            <div className="col s2 align-right truncate" style={{ backgroundColor: blueD4[SAT]}}>Requested</div> {/* job quantity is the requested amount */}
            <div className="col s2 align-right truncate" style={{ backgroundColor: tealD3[SAT]}}>Remaining</div>
            <div className="col s2 align-right truncate" style={{ backgroundColor: tealD4[SAT]}}>Building</div>
            <div className="col s1"></div>
          </div>
          {requestedParts && requestedParts.map((partEntry, index) => { return index % 2 ? ( 
                <div className="row" key={index} style={{ margin: 0 }}>
                  <div className="col s1"></div>
                  <div className="col s4 align-left truncate" style={{ backgroundColor: blueD4[SAT]}}>{partEntry.name}</div>
                  <div className="col s2 align-right" style={{ backgroundColor: blueD3[SAT]}}>{partEntry.quantity}</div>
                  <div className="col s2 align-right" style={{ backgroundColor: cyanD3[SAT]}}>{partEntry.remaining}</div>
                  <div className="col s2 align-right" style={{ backgroundColor: cyanD4[SAT]}}>{partEntry.building ? partEntry.building : 0}</div>
                  <div className="col s1"></div>
                </div>
              ) : (
                <div className="row" key={index} style={{ margin: 0 }}>
                  <div className="col s1"></div>
                  <div className="col s4 align-left truncate" style={{ backgroundColor: blueD2[SAT]}}>{partEntry.name}</div>
                  <div className="col s2 align-right" style={{ backgroundColor: blueD1[SAT]}}>{partEntry.quantity}</div>
                  <div className="col s2 align-right" style={{ backgroundColor: cyanD1[SAT]}}>{partEntry.remaining}</div>
                  <div className="col s2 align-right" style={{ backgroundColor: cyanD2[SAT]}}>{partEntry.building ? partEntry.building : 0}</div>
                  <div className="col s1"></div>
                </div>
              )
            })}
          <div className="row"></div>
          <div className="row grey darken-2" style={{ margin: 0 }}>
            <div className="col s1" style={{ padding: 2 }}> </div>
            <div className="col s3 center grey darken-3">
              Material:
            </div>
            <div className="col s4 center">
              Needed by {deliverTo}:
            </div>
            <div className="col s3 center grey darken-3">
              Resolution:
            </div>
            <div className="col s1" style={{ padding: 2 }}></div>
          </div>
          <div className="row grey darken-2" style={{ margin: 0 }}>
            <div className="col s1" style={{ padding: 2 }}></div>
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