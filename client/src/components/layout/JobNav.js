import React from 'react'
import RequestJobModal from '../modals/RequestJobModal';

const JobNav = () => {
  return (
    <div>
      <div class="navbar-fixed">
        <nav className="white">
          <div class="nav-wrapper">
            <ul className="left">
              <li>
              <a href="#modal1" className="waves-effect waves-light btn blue modal-trigger">Create Job</a>
              </li>
            </ul>
            <ul class="right hide-on-med-and-down">
              <li>
                <div class="switch">
                  <label>
                    Engineer View
                    <input type="checkbox"/>
                    <span class="lever"></span>
                    Printer View
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
