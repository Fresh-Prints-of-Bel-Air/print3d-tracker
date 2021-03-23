import React, { useEffect } from 'react'
import M from 'materialize-css/dist/js/materialize.min.js';

export const JobCard = ({ job }) => {
    useEffect(() => {
        M.AutoInit();
      }, []);
    const { job_number, requester, projectName, dateRequested, dateNeeded, completionDate, folderLocation, material, resolution, priority, deliverTo, status, notes, requestedParts, builds } = job;
    return (
        <div className="card" style={{ backgroundColor: '#323840' }}>
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

                <div className="row"></div>
                
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

export default JobCard;