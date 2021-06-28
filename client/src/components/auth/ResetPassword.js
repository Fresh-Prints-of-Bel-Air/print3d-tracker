import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { verifyResetPasswordCode, changePassword } from '../../actions/authActions';

const ResetPassword = ({user: { isAuthenticated, passwordResetCodeIsVerified, providedPasswordResetCode, passwordWasChanged }, verifyResetPasswordCode, changePassword, ...rest}) => {
    useEffect(() => {
        if (isAuthenticated) {
          rest.history.push('/');
        }
      }, [isAuthenticated, rest.history]);

      useEffect(() => {
        if(passwordWasChanged) {
            rest.history.push('/login');
        }
    }, [passwordWasChanged]);
      
      
      const [passwordResetFormData, setPasswordResetFormData] = useState({
        passwordResetCode: '',
        password: '',
        password2: '',
      });

      const { passwordResetCode, password, password2 } = passwordResetFormData;

      const onChange = (e) => {
        setPasswordResetFormData({
            ...passwordResetFormData,
            [e.target.name]: e.target.value,
          });
      }

      const onResetCodeSubmit = () => { //used to verify the password reset code provided
        verifyResetPasswordCode(passwordResetCode);
      }

      const onSubmit = () => { //used to submit the password change itself
        if(password === password2){
            changePassword(password, providedPasswordResetCode);
        }   
        else{
            alert('Passwords do not match');
        } 
      }  

    return (
    <div>
      <h2 className='center-align'>Reset Password</h2>

      <form className='center-align'>
        {passwordResetCodeIsVerified ?
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
                <div className="row">
                  <div className='col s4 offset-s4'>
                    <button
                      className='btn-large col s12 blue darken-1'
                      type='button'
                      onClick={onSubmit}
                    >
                      Change Password
                    </button>
                  </div>
                </div>

            </div>
        :
            <div>
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
              <div className="row">
                <div className='col s4 offset-s4'>
                  <button
                    className='btn-large col s12 blue darken-1'
                    type='button'
                    onClick={onResetCodeSubmit}
                  >
                    Verify Code
                  </button>
                </div>
              </div>
            </div>
              
        }
        <div className='row'>
         
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

export default connect(mapStateToProps, { verifyResetPasswordCode, changePassword })(ResetPassword);


