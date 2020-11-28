import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';

export const Navbar = ({ logout, isAuthenticated }) => {

  const onLogout = () => {
    logout();
  }

  return (
    <nav style={{ marginBottom: '30px' }} className='black'>
      <div className='nav-wrapper'>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
          <li>
            { (localStorage.getItem("token")) 
              ? <Link to='login' onClick={onLogout}>Logout</Link>
              : <Link to='login' onClick={onLogout}>Test</Link> }
             
          </li>
          <li>
            <Link to='build-history'>Build History</Link>
            
          </li>
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  logout: state.logout,
  isAuthenticated: state.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);