import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
//import store from '../../store.js';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';

export const PrivateRoute = ({ component: Component, user, loadUser, ...rest }) => {

  useEffect(() => {
    if(localStorage.token && !user.isAuthenticated){
      loadUser();
    }
  });

  return (
    <Route
      {...rest}
      render={(props) =>
        !localStorage.token ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { loadUser })(PrivateRoute);
