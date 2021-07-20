import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register, requestRegistration } from '../../actions/authActions';

export const Register = ({ user, register, requestRegistration, ...rest }) => {
  const { isAuthenticated } = user;

  useEffect(() => {
    if (isAuthenticated) {
      rest.history.push('/');
    }
  }, [isAuthenticated, rest.history]);

  const [registerFormData, setRegisterFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const { name, email, password, password2 } = registerFormData;

  const onChange = (e) =>
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      name !== '' &&
      email !== '' &&
      password !== '' &&
      password2 !== '' &&
      password === password2
    ) {
      
      // register({ name, email, password });
      requestRegistration({ name, email, password });
    } else {
      alert('Error, passwords do not match or a field is empty.');
    }
  };

  return (
    <div>
      <h2 className='center-align'>Register</h2>

      <form className='center-align' onSubmit={onSubmit}>
        <div className='row'>
          <div className='input-field col s4 offset-s4'>
            <input
              id='name'
              name='name'
              type='text'
              className='validate'
              onChange={onChange}
            />
            <label htmlFor='name'>Name</label>
          </div>
        </div>
        <div className='row'>
          <div className='input-field col s4 offset-s4'>
            <input
              id='email'
              name='email'
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
              id='password'
              name='password'
              type='password'
              className='validate'
              onChange={onChange}
            />
            <label htmlFor='password'>Password</label>
          </div>
        </div>

        <div className='row'>
          <div className='input-field col s4 offset-s4'>
            <input
              id='password2'
              name='password2'
              type='password'
              className='validate'
              onChange={onChange}
            />
            <label htmlFor='password2'>Confirm Password</label>
          </div>
        </div>
        <div className='row'>
          <div className='col s4 offset-s4'>
            <button
              className='btn-large col s12 blue darken-1'
              type='submit'
            >
              Request Registration
            </button>
          </div>
        </div>
      </form>

      <div className='row'>
        <div className='col s2 offset-s4'>
          <Link to='/Login'>
            <i className='waves-effect waves-light btn col s12 blue darken-1'>
              Login
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
});

export default connect(mapStateToProps, { register, requestRegistration })(Register);
