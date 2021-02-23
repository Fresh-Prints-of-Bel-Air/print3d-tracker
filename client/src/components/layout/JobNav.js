import React from 'react'
import RequestJobModal from '../modals/RequestJobModal';


const JobNav = () => {
  return (
    <div>
      <div className="navbar-fixed">
        <nav className="white">
          <div className="nav-wrapper">
            <ul className="left">
              <li>
              <a href="#modal1" className="waves-effect waves-light btn blue modal-trigger">Create Job</a>
              </li>
            </ul>
            <ul className="right hide-on-med-and-down">
              <li>
                <div className="switch">
                  <label>
                    Engineer View
                    <input type="checkbox"/>
                    <span className="lever"></span>
                    Operator View
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <RequestJobModal/>
    </div>
  )
}

export default JobNav;
