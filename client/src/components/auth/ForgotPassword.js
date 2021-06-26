import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

//const ForgotPassword = ({user: { isAuthenticated }, forgotPassword, ...rest}) => {

const ForgotPassword = ({user: { isAuthenticated }, ...rest}) => {
    useEffect(() => {
        if (isAuthenticated) {
          rest.history.push('/');
        }
      }, [isAuthenticated, rest.history]);

      const onChange = () => {

      }

      const onSubmit = () => {

      }


    return (
    <div>
      <h2 className='center-align'>Reset Password</h2>

      <form className='center-align' onSubmit={onSubmit}>
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
          <div className='col s4 offset-s4'>
            <button
              className='waves-effect waves-light btn-large col s12 blue darken-1'
              type='submit'
            >
              Request Password Reset
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
          <Link to='/Register'>
            <i className='waves-effect waves-light btn col s12 blue darken-1'>
              Need to Register?
            </i>
          </Link>
        </div>
      </div>
    </div>
  );
    
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(ForgotPassword);

//export default connect(mapStateToProps, { forgotPassword })(ForgotPassword);