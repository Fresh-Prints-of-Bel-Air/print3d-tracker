import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';
import JobCard from '../cards/JobCard';
const Home = ({ user, loadUser }) => {
  useEffect(() => {
    console.log('Home component mounted');
    loadUser();
    //eslint-disable-next-line
  }, []);
  return (
    <JobCard></JobCard>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { loadUser })(Home);
