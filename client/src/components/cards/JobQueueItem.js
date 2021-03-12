import React from 'react'


export const JobQueueItem = ({ job }) => {
    const { job_number, requester, projectName, dateRequested, dateNeeded, completionDate, folderLocation, material, resolution, priority, deliverTo, status, notes, requestedParts, builds } = job;
    return (
        <div className="card" style={{ backgroundColor: '#323840' }}>
              <div className="card-content white-text" style={{ padding: 0 }}>
                <div className="row grey darken-3" style={{ margin: 0 }}>
                  <div className="col s1 grey darken-2" style={{ padding: 2 }}>
                    #{job_number}
                  </div>
                  <div className="col s2">
                    {projectName}
                  </div>
                  <div className="col s6">
                    Requested By {requester} on {dateRequested.split('T')[0]}
                  </div>
                  <div className="col s3 grey darken-2">
                    STATUS: {status}
                  </div>
                </div>

                <div className="row grey darken-3">
                  <div className="col s1" style={{ padding: 2 }}>
                    
                  </div>
                  <div className="col s2">
                    Folder:
                  </div>
                  <div className="col s6">
                    {folderLocation}
                  </div>
                  <div className="col s3 grey darken-2">
                    PRIORITY: {priority}
                  </div>
                </div>

                <div className="row" style={{ margin: 0 }}>
                  <div className="col s3"></div>
                  <div className="col s5 align-left blue darken-4">Part</div>
                  <div className="col s1 align-right cyan darken-4">Qty</div>
                  <div className="col s3"></div>
                </div>
                {requestedParts.map((partEntry, index) => { return index % 2 ? ( 
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
                
                <div className="row grey darken-3">
                  <div className="col s1" style={{ padding: 2 }}>
                    
                  </div>
                  <div className="col s3">
                    Material: {material}
                  </div>
                  <div className="col s3 grey darken-2">
                    Resolution: {resolution}
                  </div>
                  <div className="col s3">
                    Needed by: {dateNeeded.split('T')[0]}
                  </div>
                </div>
                
                <div className="row center">
                  notes: {notes}
                </div>
              </div>
              
        </div>
    )
}

export default JobQueueItem;