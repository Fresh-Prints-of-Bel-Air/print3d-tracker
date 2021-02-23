import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';

export const Navbar = ({ user, logout }) => {
  // click event function for Logout link
  const onLogout = () => logout();
  return (
    <div className="navbar-fixed">
      <nav className='black'>
        <div className='nav-wrapper'>
          <ul id='nav-mobile' className='left hide-on-med-and-down'>
            <img alt="Altaviz" src="/images/AltaViz.jpg" style={{maxWidth:'30%', maxHeight:'100%', filter: 'brightness(180%)'}}></img>
          </ul>
          <ul id='nav-mobile' className='right hide-on-med-and-down'>
              { (localStorage.getItem("token") !== null) &&
                <li>
                  <Link to='login' onClick={onLogout}>Logout</Link>
                </li>   
             }
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='build-history'>Build History</Link>
             </li>
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