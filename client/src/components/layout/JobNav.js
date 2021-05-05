import React, { useRef, useEffect, useState } from 'react'
import RequestJobModal from '../modals/RequestJobModal';
import CreateBuildModal from '../modals/CreateBuildModal';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/authActions';
import Switch from 'react-switch';

const JobNav = ({ user: {user}, updateUser, job: {job} }) => { // todo add selectedJobId to redux state
  //////////////// delete job modal stuff
  // const [jobIdForModal, setJobIdForModal] = useState(0);

  // const handleCardButtonClick = (cardJobId) => {
  //     setJobIdForModal(cardJobId);
  // }
  ////////////////
  
  const [checkedState, setCheckedState] = useState(false);

  useEffect(() => {
    console.log(user.preferredView);
  }, [user]);

  const onViewToggleChange = (checked) => {
    
    setCheckedState(checked);

    if(checked) {
      updateUser({...user, preferredView: 'Operator'});
    }
    else{
      updateUser({...user, preferredView: 'Engineer'});
    }
  }

  return (
    <div>
      <div className="navbar-fixed"  style={{zIndex: '2'}}>
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
            <ul style={{marginRight: '1vw'}} className="right hide-on-med-and-down black-text">
              <li style={{marginRight: '1vw', fontWeight: checkedState == false && 'bold'}}>Engineer View</li>
              <li style={{marginTop: '0.4vh'}}>
                <Switch 
                    onChange={onViewToggleChange} 
                    checked={checkedState}
                    offColor={'#00ACC1'}
                    onColor={'#1E88E5'}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    width={40}
                    height={20}
                />
              </li>
              <li style={{marginLeft: '1vw', fontWeight: checkedState == true && 'bold'}}>Operator View</li>
            </ul>
          </div>
        </nav>
      </div>
      {user.preferredView === 'Engineer' ? <RequestJobModal/> : '<CreateBuildModal/>'}

      
      

    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
  job: state.job
});

export default connect(mapStateToProps, {updateUser})(JobNav);
