import React from 'react'


export const JobQueueItem = ({ job }) => {
    const { job_number, requester, projectName, dateRequested, dateNeeded, completionDate, folderLocation, material, resolution, priority, deliverTo, status, notes, requestedParts, builds } = job;
    return (
        <div className="card" style={{ backgroundColor: '#323840' }}>
              <div className="card-content white-text" style={{ padding: 0 }}>
                <div className="row">
                  <div className="col s1 red darken-4" style={{ padding: 2 }}>
                    #{job_number}
                  </div>
                  <div className="col s2">
                    {projectName}
                  </div>
                  <div className="col s6">
                    Requested By {requester} on 3/5/2021
                  </div>
                  <div className="col s3">
                    STATUS: {status}
                  </div>
                </div>
                <div className="row">
                  <div className="col s3 yellow"></div>
                  <div className="col s5 align-left red">Part</div>
                  <div className="col s1 align-right blue">Qty</div>
                  <div className="col s3 green"></div>
                </div>
                {requestedParts.map((partEntry) => { return ( 
                  <div className="row">
                    <div className="col s3 yellow"></div>
                    <div className="col s5 align-left red">{partEntry.name}</div>
                    <div className="col s1 align-right blue">{partEntry.quantity}</div>
                    <div className="col s3 green"></div>
                  </div>
                )})}
                
              
                <span>Card Title</span>
                <p>notes: {notes}</p>
              </div>
              
        </div>
    )
}

export default JobQueueItem;