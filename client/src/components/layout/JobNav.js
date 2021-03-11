import React, { useRef, useEffect } from 'react'
import RequestJobModal from '../modals/RequestJobModal';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/authActions';
 
const JobNav = ({user: {user}, updateUser}) => {
  
  useEffect(() => {
    console.log(user.preferredView);
  }, [user]);

  const toggle = useRef(null);
  const onViewToggleChange = () => {
    console.log(toggle.current.checked);
    console.log(user.preferredView);
    if(toggle.current.checked) {
      console.log('should be switced to operator');
      updateUser({...user, preferredView: 'Operator'});
    }
    else{
      updateUser({...user, preferredView: 'Engineer'});
    }
  }

  return (
    <div>
      <div className="navbar-fixed">
        <nav className="white">
          <div className="nav-wrapper">
            <ul className="left">
              <li>
              {user.preferredView === 'Engineer' ? 
                <a href="#modal1" className="waves-effect waves-light btn blue modal-trigger">Create Job</a> 
                : 
                <a href="#modal2" className="waves-effect waves-light btn blue modal-trigger">Create Build</a>
              } 
              </li>
            </ul>
            <ul className="right hide-on-med-and-down">
              <li>
                <div className="switch">
                  <label>
                    Engineer View
                    <input type="checkbox" ref={toggle} onClick={onViewToggleChange} checked={user.preferredView === 'Operator'}/>
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

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {updateUser})(JobNav);
