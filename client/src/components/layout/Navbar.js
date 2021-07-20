import React, { useState, useEffect, createRef } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout, updateUser, getAdmin, getUser } from '../../actions/authActions';
import NotificationPanel from './NotificationPanel';
import AdminModal from '../modals/AdminModal';
import M from 'materialize-css';

export const Navbar = ({ user: {user, isAuthenticated, isAdmin}, admin: { registrationRequests }, logout, updateUser, getUser, getAdmin }) => {
  
  const [notificationStatus, setNotificationStatus] = useState({
      unread: false,
      showNotifications: false,
    });
  
  useEffect(() => {
    if(isAuthenticated === true){
      getAdmin();
    }
    M.AutoInit();
  }, [user]);
  
 
  
  useEffect(() => {
    M.AutoInit();
    if(user){
      let i;
      setNotificationStatus({...notificationStatus, unread: false});
      for(i = 0; i < user.notifications.length; i++) { //set the notification button pulse effect if there are unread notifications
        if(user.notifications[i].isRead === false){
          setNotificationStatus({ ...notificationStatus, unread: true});
          break;
        } 
      }
    }
  }, [user]);

  

  // const closeNotifications = () => {
  //   console.log('close notifications');
  //   document.removeEventListener('click', closeNotifications);
  //   setNotificationStatus({
  //     ...notificationStatus,
  //     showNotifications: false,
  //   });
  // }

  //${ (admin && admin.registrationRequests.length > 0) ? "pulse" : ""}`}
  const showNotifications = () => {
    setNotificationStatus({
      ...notificationStatus,
      showNotifications: true,
    });
  }

  // click event function for Logout link
  const navLinkStyle = { backgroundColor: '#1565c0', height: '6.8vh'}; // blue darken-3
  const navLinkClass = "valign-wrapper"
  const onLogout = () => logout();
  
  return (
    <div className="navbar-fixed" style={{height: '6.8vh'}}>
      <nav className='black' style={{height: '6.8vh'}}>
        
        <div className='nav-wrapper' style={{height: '6.8vh'}}>
          <a href="#" className="brand-logo">
            <div className="valign-wrapper" style={{height: '6.8vh'}}>
              <img alt="Altaviz" src="/images/AltaViz.jpg" style={{maxWidth:'80%', maxHeight:'100%', filter: 'brightness(180%)'}}></img>
            </div>
          </a>
          {(localStorage.getItem("token") !== null) && 
            <ul id='nav-mobile' className='right hide-on-med-and-down' style={{height: '6.8vh'}}>
            <li>
              {isAdmin && <a href="#adminModal" style={{marginTop: '1.5vh'}} className={`btn blue modal-trigger ${ (registrationRequests && registrationRequests.length >= 1) ? "pulse" : ""}`}  >ADMIN</a>}  
            </li>
            <li>
              <NavLink to='/' exact className={navLinkClass} activeStyle={navLinkStyle} style={{height: '6.8vh'}} onClick={getUser}>Home</NavLink>
            </li>
            <li>
              <NavLink to='build-history' className={navLinkClass} activeStyle={navLinkStyle} style={{height: '6.8vh'}} onClick={getUser}>Build History</NavLink>
            </li>
            <li>
              <NavLink to='request-history' className={navLinkClass} activeStyle={navLinkStyle} style={{height: '6.8vh'}} onClick={getUser}>Request History</NavLink>
            </li>
            {(localStorage.getItem("token") !== null) && 
              <li style={{height: '6.8vh'}}>
                  {/* need to make sure the "pulse" class is removed if there are no unread notifications */}
                  <div className="valign-wrapper" style={{height: '6.8vh'}}>
                    <a style={{userSelect: 'none'}} className={`btn-floating btn blue  ${notificationStatus.unread ? "pulse" : ""}`} onMouseDown={!notificationStatus.showNotifications ? showNotifications : undefined}><i className="material-icons">notifications_none</i></a>
                  </div>
                  
              </li>
            }
            {(localStorage.getItem("token") !== null) &&
              <li>
                <NavLink to='login' className={navLinkClass} activeStyle={navLinkStyle} style={{height: '6.8vh'}} onClick={onLogout}>Logout</NavLink>
              </li>   
            }
          </ul>
          }
        </div>
        {(localStorage.getItem("token") !== null && notificationStatus.showNotifications) &&
          <NotificationPanel setNotificationStatus={setNotificationStatus}/>
        }
      </nav>
      {isAdmin && <AdminModal/> }
    </div>
    
  )
}


const mapStateToProps = (state) => ({
  user: state.user,
  logout: state.logout,
  admin: state.admin
});

export default connect(mapStateToProps, { logout, updateUser, getUser, getAdmin })(Navbar);