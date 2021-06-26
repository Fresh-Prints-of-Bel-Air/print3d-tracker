import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

//const ResetPassword = ({user: { isAuthenticated }, resetPassword, verifyResetPasswordCode ...rest}) => {

const ForgotPassword = ({user: { isAuthenticated, passwordCanBeReset }, ...rest}) => {
    useEffect(() => {
        if (isAuthenticated) {
          rest.history.push('/');
        }
      }, [isAuthenticated, rest.history]);
      
      const [userFormData, setUserFormData] = useState({
        resetCode: '',
        password1: '',
        password2: '',
      });

      const onChange = () => {
        setUserFormData({
            ...userFormData,
            [e.target.name]: e.target.value,
          });
      }

      const onResetCodeSubmit = () => {
        verifyResetPasswordCode(userFormData.resetCode);
      }

      const onPasswordChangeSubmit = () => {
        const errorString = '';
        if(password1 === password2){
            resetPassword(userFormData.resetCode, password1);
        }   
        else{
            alert('Passwords do not match');
        } 
      }  

    return (
    <div>
      <h2 className='center-align'>Reset Password</h2>

      <form className='center-align' onSubmit={onSubmit}>
        {passwordCanBeReset ?
            <div>
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
            </div>
        :
            <div className='row'>
                <div className='input-field col s4 offset-s4'>
                <input
                    id='passwordResetCode'
                    name='passwordResetCode'
                    type='passwordResetCode'
                    className='validate'
                    onChange={onChange}
                />
                <label htmlFor='email'>Enter your password reset code here: </label>
                </div>
            </div>
        }
        <div className='row'>
          <div className='col s4 offset-s4'>
            <button
              className='waves-effect waves-light btn-large col s12 blue darken-1'
              type='submit'
            >
              Reset Password
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

//export default connect(mapStateToProps, { resetPassword })(ForgotPassword);
