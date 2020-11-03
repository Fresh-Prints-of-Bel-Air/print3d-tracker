import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';

export const Login = ({ user, login, ...rest }) => {
  const { isAuthenticated } = user;
  useEffect(() => {
    if (isAuthenticated) {
      rest.history.push('/');
    }
    // if(error === 'Invalid Credentials') {
    //   setAlert(error, 'danger');
    //   clearErrors();
    // }
  }, [isAuthenticated, rest.history]);
  const [userFormData, setUserFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = userFormData;

  const onChange = (e) => {
    setUserFormData({
      ...userFormData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email !== '' && password !== '') {
      console.log('submit called:' + email + ' ' + password);
      login({
        email,
        password,
      });
    } else {
      // call a setAlert?
    }
  };

  return (
    <div>
      <h2 className='center-align'>Login</h2>

      <form className='center-align' onSubmit={onSubmit}>
        <div className='row'>
          <div className='input-field col s4 offset-s4'>
            <input
              name='email'
              id='email'
              type='email'
              className='validate'
              onChange={onChange}
            />
            <label htmlFor='email'>Email</label>
          </div>
        </div>

        <div className='row'>
          <div className='input-field col s4 offset-s4'>
            <input
              name='password'
              id='password'
              type='password'
              className='validate'
              onChange={onChange}
            />
            <label htmlFor='password'>Password</label>
          </div>
        </div>
        <div className='row'>
          <div className='col s4 offset-s4'>
            <button
              className='waves-effect waves-light btn-large col s12 blue darken-1'
              type='submit'
            >
              Login
            </button>
          </div>
        </div>
      </form>

      <div className='row'>
        <div className='col s2 offset-s4'>
          <Link to='/Register'>
            <i className='waves-effect waves-light btn col s12 blue darken-1'>
              Need to register?
            </i>
          </Link>
        </div>
        <div className='col s2'>
          <Link to='/ForgotPassword'>
            <i className='waves-effect waves-light btn col s12 blue darken-1'>
              Forgot Password?
            </i>
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  // some how works without adding this next line?
  login: state.login
});

export default connect(mapStateToProps, { login })(Login);
