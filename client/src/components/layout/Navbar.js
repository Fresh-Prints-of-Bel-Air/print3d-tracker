import React, { useState, useEffect, createRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout, updateUser } from '../../actions/authActions';
import NotificationPanel from './ NotificationPanel';
import M from 'materialize-css';

export const Navbar = ({ user: {user}, logout, updateUser }) => {
  
  const [notificationStatus, setNotificationStatus] = useState({
      unread: false,
      showNotifications: false,
    });
    
  
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

  const showNotifications = () => {
    console.log("Show notifications button");
    console.log(user.notifications);
    setNotificationStatus({
      ...notificationStatus,
      showNotifications: true,
    });
  }

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
            {(localStorage.getItem("token") !== null) && 
              <li>
                  {/* need to make sure the "pulse" class is removed if there are no unread notifications */}
                  <a style={{userSelect: 'none'}} className={`btn-floating btn blue ${notificationStatus.unread ? "pulse" : ""}`} onMouseDown={!notificationStatus.showNotifications ? showNotifications : undefined}><i class="material-icons">notifications_none</i></a>
              </li>
            }
          </ul>
        </div>
        {(localStorage.getItem("token") !== null && notificationStatus.showNotifications) &&
          <NotificationPanel setNotificationStatus={setNotificationStatus}/>
        }
      </nav>
    </div>
    
  )
}


const mapStateToProps = (state) => ({
  user: state.user,
  logout: state.logout,

});

export default connect(mapStateToProps, { logout, updateUser })(Navbar);