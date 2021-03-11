import React from 'react'


export const JobQueueItem = ({ job }) => {
    return (
        <div className="card" style={{ backgroundColor: '#323840' }}>
              <div className="card-content white-text" style={{ padding: 0 }}>
                <div className="row">
                  <div className="col s1 red darken-4" style={{ padding: 2 }}>
                    #9999
                  </div>
                  <div className="col s2">
                    AIM
                  </div>
                  <div className="col s6">
                    Requested By John on 3/5/2021
                  </div>
                  <div className="col s2">
                    STATUS: Requested
                  </div>

                </div>
                <span>Card Title</span>
                <p>I am a very simple card. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively.</p>
              </div>
              
        </div>
    )
}

export default JobQueueItem;