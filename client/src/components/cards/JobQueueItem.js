import React from 'react'
import M from 'materialize-css';

export const JobQueueItem = () => {
    return (
        <div className="card" style={{ backgroundColor: '#323840' }}>
              <div className="card-content white-text">
                <span className="card-title">Card Title</span>
                <p>I am a very simple card. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively.</p>
              </div>
              <div className="card-action">
                <a href="#" className="blue-text">This is a link</a>
                <a href="#" className="blue-text">This is a link</a>
              </div>
        </div>
    )
}

export default JobQueueItem;