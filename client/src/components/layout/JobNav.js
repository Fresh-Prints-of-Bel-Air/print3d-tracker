import React, { useRef, useEffect } from 'react'
import RequestJobModal from '../modals/RequestJobModal';
import CreateBuildModal from '../modals/CreateBuildModal';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/authActions';
 
const JobNav = ({ user: {user}, updateUser, job: {job} }) => { // todo add selectedJobId to redux state
  //////////////// delete job modal stuff
  // const [jobIdForModal, setJobIdForModal] = useState(0);

  // const handleCardButtonClick = (cardJobId) => {
  //     setJobIdForModal(cardJobId);
  // }
  ////////////////
  
  useEffect(() => {
    console.log(user.preferredView);
  }, [user]);

  const toggle = useRef(null);
  const onViewToggleChange = () => {
    console.log(toggle.current.checked);
    console.log(user.preferredView);
    if(toggle.current.checked) {
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
                <a href="#jobModal" className="waves-effect waves-light btn blue modal-trigger">Create Job</a> 
                : 
                <a href="#buildModal" className="waves-effect waves-light btn blue modal-trigger">Create Build</a>
              } 

                

              </li>
            </ul>
            
            <ul className="right black-text">
              <li><p4 className="center">Engineer View</p4></li>
              <li>
                <div className="switch">
                  <label>
                    <input type="checkbox" ref={toggle} onClick={onViewToggleChange} checked={user.preferredView === 'Operator'}/>
                    <span className="lever"></span>
                  </label>
                </div>
              </li>
              <li><p4 className="center">Operator View</p4></li>
              <li>&nbsp; &nbsp; &nbsp;</li>
            </ul>
          </div>
        </nav>
      </div>
      {/*user.preferredView === 'Engineer' ? <RequestJobModal/> : '<CreateBuildModal/>'*/}
      <RequestJobModal/>
      
      

    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
  job: state.job
});

export default connect(mapStateToProps, {updateUser})(JobNav);
