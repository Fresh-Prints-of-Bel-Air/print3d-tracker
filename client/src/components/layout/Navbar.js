import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';

export const Navbar = ({ user, logout }) => {
  // click event function for Logout link
  const navLinkStyle = { backgroundColor: '#1565c0' }; // blue darken-3
  const onLogout = () => logout();
  return (
    <div className="navbar-fixed">
      <nav className='black'>
        <div className='nav-wrapper'>
          <ul id='nav-mobile' className='left hide-on-med-and-down'>
            <img alt="Altaviz" src="/images/AltaViz.jpg" style={{maxWidth:'30%', maxHeight:'100%', filter: 'brightness(180%)'}}></img>
          </ul>
          <ul id='nav-mobile' className='right hide-on-med-and-down'>
            
            <li>
              <NavLink to='/' exact activeStyle={navLinkStyle}>Home</NavLink>
            </li>
            <li>
              <NavLink to='build-history' activeStyle={navLinkStyle}>Build History</NavLink>
             </li>
             <li>
              <NavLink to='request-history' activeStyle={navLinkStyle}>Request History</NavLink>
             </li>
             { (localStorage.getItem("token") !== null) &&
              <li>
                <NavLink to='login' activeStyle={navLinkStyle} onClick={onLogout}>Logout</NavLink>
              </li>   
             }
          </ul>
        </div>
      </nav>
    </div>
    
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  logout: state.logout,

});

export default connect(mapStateToProps, { logout })(Navbar);