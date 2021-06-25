import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';
import Preloader from '../layout/Preloader';
import JobNav from '../layout/JobNav';
import EngineerHome from './EngineerHome';
import OperatorHome from './OperatorHome';
import M from 'materialize-css/dist/js/materialize.min.js';


const Home = ({ user: {user}, loadUser }) => {



  useEffect(() => {
    M.AutoInit();
    
    console.log('Home component mounted');
    loadUser();
    //eslint-disable-next-line
  }, []);
  if(user === null) {
    return <Preloader/>;
  }
  return (
    <div style={{position: 'relative'}}>
      <JobNav/>
      {user.preferredView === 'Operator' ? <OperatorHome/> : <EngineerHome/>}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { loadUser })(Home);
