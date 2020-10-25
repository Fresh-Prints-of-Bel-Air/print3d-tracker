import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';
import BuildLogs from '../logs/BuildLogs';
const Home = ({ user, loadUser }) => {
  useEffect(() => {
    console.log('Home component mounted');
    loadUser();
    //eslint-disable-next-line
  }, []);
  return (
    <div className='grid-2'>
      <BuildLogs />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { loadUser })(Home);
