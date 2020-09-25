import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../actions/authActions';

export const Register = ({ user, register, ...rest }) => {
  const { isAuthenticated } = user;

  useEffect(() => {
    console.log(user);
    if (isAuthenticated) {
      rest.history.push('/');
    }
  }, [isAuthenticated, rest.history]);

  const [registerFormData, setRegisterFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = registerFormData;

  const onChange = (e) =>
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('onSubmit called');
    if (
      name !== '' &&
      email !== '' &&
      password !== '' &&
      password2 !== '' &&
      password === password2
    ) {
      console.log('form data valid');
      register({
        name,
        email,
        password,
      });
    } else {
      console.log('error, passwords do not match or a field is empty');
      // create some alert?
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
              className='waves-effect waves-light btn-large col s12 blue darken-1'
              type='submit'
            >
              Register
            </button>
          </div>
        </div>
      </form>

      <div className='row'>
        <div className='col s2 offset-s4'>
          <Link to='/Login'>
            <a className='waves-effect waves-light btn col s12 blue darken-1'>
              Login
            </a>
          </Link>
        </div>
        <div className='col s2'>
          <Link to='/ForgotPassword'>
            <a className='waves-effect waves-light btn col s12 blue darken-1'>
              Forgot Password?
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { register })(Register);
