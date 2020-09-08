import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
export const Login = (props) => {
  useEffect(() => {});
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { email, password } = user;

  return (
    <div>
      <h2 className='center-align'>Login</h2>

      <form className='center-align'>
        <div className='row center-align'>
          <div className='input-field col s4 offset-s4'>
            <input id='email' type='email' className='validate' />
            <label for='email'>Email</label>
          </div>
        </div>

        <div className='row center-align'>
          <div className='input-field col s4 offset-s4'>
            <input id='password' type='password' className='validate' />
            <label for='password'>Password</label>
          </div>
        </div>
      </form>
      <div className='center-align'>
        <li>
          <Link to='/Register'>Need to Register?</Link>
        </li>
      </div>
    </div>
  );
};

export default Login;
