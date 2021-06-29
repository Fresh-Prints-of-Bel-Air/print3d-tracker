import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { updateUser } from '../../actions/authActions';

const NotificationPanel = ({user: { user }, updateUser, setNotificationStatus}) => {
  const notificationRef = useRef();

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [user]);

  const markRead = (e) => { //mark a notification as read, updating the user
      
      console.log("Marked as read");
      console.log(user.notifications.map(
        (notification, index) => (index == e.target.id ? {...notification, isRead: true} : notification)
      ));
      
      updateUser({
        ...user,
        notifications: user.notifications.map(
          (notification, index) => (index == e.target.id ? {...notification, isRead: true} : notification)
        )
      });  
    
  }

  const handleClickOutside = (e) => {
    if(notificationRef.current && !notificationRef.current.contains(e.target)){
      setNotificationStatus((prev) => {
        return {...prev, showNotifications: false};
      });
  }
}
  return (
    <div ref={notificationRef} name="notificationPanel" style={{position: 'absolute', width: '30vw', zIndex: '10',  right: '2px', borderStyle: 'solid', borderColor: 'white', borderWidth: 'thin', borderTop: 'none'}}>
          <div  className="grey darken-4" style={{ height: '5vh', zIndex: '10', textAlign: 'center', fontSize: '200%'}}>
              Notifications
          </div>
          <div className="z-depth-5 grey darken-4" style={{overflowY: 'scroll', maxHeight: '40vh'}}>
            <div className= "row" style={{position: 'relative', top: '1vh', zIndex: '9'}}>
              {(user && user.notifications && user.notifications.length > 0) ? user.notifications.map((notification, index) =>
                  <div key={index} className="row">
                    <div className="card grey darken-3 z-depth-5" style={{color: 'white', marginLeft: '2%', marginRight: '2%'}} key={index}>
                      <div className="card-content">
                        <span className="row card-title" style={{textAlign: 'right', fontSize: '90%'}}>On {notification.dateCreated.split('T')[0]}</span>
                        <div className="row">
                          <div className="col s7" style={notification.isRead ? {fontWeight: 'normal', lineHeight: '1.5'} : {fontWeight: 'bold', lineHeight: '1.5'}}>{notification.text}</div>
                          <span className="col s5">
                          {!(notification.isRead) && <a name="markRead" style={{width: '100%'}} className="waves-effect waves-light btn-small blue" onClick={markRead} id={index}>Mark Read</a>
                          }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) 
                : 
                  <div className="row" style={{height: '5vh', textAlign: 'center'}}>You don't currently have any notifications...</div>
              }
            </div>
          </div>
        </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {updateUser})(NotificationPanel);