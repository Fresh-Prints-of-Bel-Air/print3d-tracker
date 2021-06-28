import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestPasswordReset } from '../../actions/authActions';


const ForgotPassword = ({user: { isAuthenticated }, requestPasswordReset, ...rest}) => {
    useEffect(() => {
        if (isAuthenticated) {
          rest.history.push('/');
        }
      }, [isAuthenticated, rest.history]);

      const [forgotPasswordFormData, setForgotPasswordFormData] = useState({
        email: '',
      });

      const onChange = (e) => {
        setForgotPasswordFormData({
          ...forgotPasswordFormData,
          [e.target.name]: e.target.value,
        });
      }

      const onSubmit = () => {
        requestPasswordReset(forgotPasswordFormData.email);
        alert("Your password reset request has been submitted. If there is an account associated with the email you have entered, a password reset code and link will be sent to that email address.");
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
              className='btn-large col s12 blue darken-1'
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

export default connect(mapStateToProps, { requestPasswordReset })(ForgotPassword);