import React from 'react'

export const JobQueueItem = ({ job }) => {
    return (
        <div className="card" style={{ backgroundColor: '#323840' }}>
              <div className="card-content white-text">
                <span className="card-title">{job.requester}</span>
                <p>{job.material}</p>
              </div>
              <div className="card-action">
                <a href="#" className="blue-text">This is a link</a>
                <a href="#" className="blue-text">This is a link</a>
              </div>
        </div>
    )
}

export default JobQueueItem;