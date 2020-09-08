import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
export const Login = (props) => {
  useEffect(() => {});
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { email, password } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if(email !== '' || password !== ''){
      login({
        email,
        password
      })
    } else {
      // call a setAlert?
    }
  }

  return (
    <div>
      <h2 className='center-align'>Login</h2>

      <form className='center-align' onSubmit={onSubmit}>
        <div className='row center-align'>
          <div className='input-field col s4 offset-s4'>
            <input id='email' type='email' className='validate' onChange={onChange}/>
            <label for='email'>Email</label>
          </div>
        </div>

        <div className='row center-align'>
          <div className='input-field col s4 offset-s4'>
            <input id='password' type='password' className='validate' onChange={onChange}/>
            <label for='password'>Password</label>
          </div>
        </div>
      </form>
      <Fragment>
        <li>
          <Link to='/Register'>Need to Register?</Link>
        </li>
      </Fragment>
    </div>
  );
};

export default Login;
