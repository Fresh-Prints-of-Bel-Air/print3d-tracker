import React, { useEffect } from 'react'
import M from 'materialize-css/dist/js/materialize.min.js';

export const JobQueueItem = ({ job }) => {
    useEffect(() => {
        M.AutoInit();
      }, []);
    const { job_number, requester, projectName, dateRequested, dateNeeded, completionDate, folderLocation, material, resolution, priority, deliverTo, status, notes, requestedParts, builds } = job;
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

                <div className="row"></div>
                
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
                  NOTE: {notes}
                </div>
              </div>
              
        </div>
    )
}

export default JobQueueItem;